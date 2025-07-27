import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setUser } from "../utils/userSlice";

const AuthPage = () => {
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [language, setLanguage] = useState("Hindi");
  const [role, setRole] = useState("buyer");
  const [isExistingUser, setIsExistingUser] = useState(null);
  const [devOtp, setDevOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  const checkUserAndSendOtp = async () => {
    if (!phone || phone.length !== 10)
      return setMessage("Please enter a valid 10-digit phone number.");

    setLoading(true);
    try {
      const check = await api.post("/auth/check-user", { phone });
      setIsExistingUser(check.data.exists);

      const res = await api.post("/auth/request-otp", { phone });
      setDevOtp(res.data.devOtp || "");
      setMessage("OTP sent");
      setStep("otp");
    } catch {
      setMessage("Error sending OTP.");
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    if (!otp) return setMessage("Enter the OTP sent to your phone.");
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-otp", {
        phone,
        otp,
        ...(isExistingUser ? {} : { fullName, language, role }),
      });

      localStorage.setItem("token", res.data.token);
      setMessage(res.data.msg);

      const userRole = res.data.user.role;
      if (userRole === "supplier") navigate("/dashboard");
      else if (userRole === "buyer") navigate("/");
      else setMessage("Unknown user role. Please contact support.");
      dispatch(setUser(res.data.user));
    } catch {
      setMessage("Invalid OTP or failed login.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        {/* Logo & Title */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 text-2xl font-bold text-orange-600">
            Welcome
          </div>
          <p className="text-sm text-gray-600 text-center mt-1">
            आपका स्वागत है !
          </p>
          <span className="text-gray-800 font-medium">
            Sign in to join clusters and get best prices!
          </span>
        </div>

        {/* Flash Message */}
        {message && (
          <div className="mb-3 text-center text-sm text-red-500">{message}</div>
        )}

        {/* Phone Input Step */}
        {step === "phone" && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1">
              📱 Mobile Number
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500 mb-4">
              <span className="text-gray-600 text-sm mr-2">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter 10-digit number"
                className="w-full outline-none text-sm text-gray-800 placeholder-gray-400"
              />
            </div>
            <button
              onClick={checkUserAndSendOtp}
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition shadow-md"
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </button>
          </>
        )}

        {/* OTP Step */}
        {step === "otp" && (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1 mt-4">
              🔐 Enter OTP
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit OTP"
              className="w-full border rounded-lg px-3 py-2 mb-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* New user details form */}
            {!isExistingUser && (
              <>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  👤 Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                />

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🗣️ Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-3 text-sm"
                >
                  <option>Hindi</option>
                  <option>English</option>
                </select>

                <label className="block text-sm font-medium text-gray-700 mb-1">
                  🎯 Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 mb-4 text-sm"
                >
                  <option value="buyer">Buyer</option>
                  <option value="supplier">Supplier</option>
                </select>
              </>
            )}

            <button
              onClick={handleVerify}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition shadow-md"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              onClick={checkUserAndSendOtp}
              className="mt-3 w-full text-sm text-orange-600 underline"
            >
              Resend OTP
            </button>

            {/* Dev OTP */}
            {devOtp && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Dev OTP: <span className="font-mono">{devOtp}</span>
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
