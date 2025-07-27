import React, { useState, useEffect } from "react";
import api from "../utils/api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons (for Leaflet)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const LocationPicker = ({ onSelect }) => {
  useMapEvents({
    click(e) {
      onSelect([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const CreateCluster = () => {
  const [form, setForm] = useState({
    name: "",
    city: "",
    area: "",
    meetingDay: "",
    meetingTime: "",
  });

  const [marker, setMarker] = useState(null);
  const [areaSuggestion, setAreaSuggestion] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // 🧭 Reverse geocode when map is clicked
  const fetchAreaNameFromCoords = async ([lat, lng]) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const name =
        data?.address?.suburb ||
        data?.address?.neighbourhood ||
        data?.address?.city_district ||
        data?.display_name ||
        "Unknown Area";
      setAreaSuggestion(name);
    } catch {
      setAreaSuggestion("Couldn't fetch area name");
    }
  };

  const handleMapClick = (coords) => {
    setMarker(coords);
    fetchAreaNameFromCoords(coords);
  };

  // 🧭 Forward geocode when user types city + area
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (form.area && form.city) {
        try {
          const query = `${form.area}, ${form.city}`;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
              query
            )}&format=json&limit=1`
          );
          const data = await res.json();
          if (data?.[0]) {
            const lat = parseFloat(data[0].lat);
            const lon = parseFloat(data[0].lon);
            setMarker([lat, lon]);
            setAreaSuggestion(data[0].display_name || "");
          }
        } catch {
          console.log("Error getting coordinates from name");
        }
      }
    }, 1000); // debounce

    return () => clearTimeout(delayDebounce);
  }, [form.area, form.city]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!marker) {
      alert("Please select a location on the map.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        coordinates: {
          type: "Point",
          coordinates: [marker[1], marker[0]], // Note: [lng, lat]
        },
      };

      const token = localStorage.getItem("token");
      console.log("Frontend sending token:", token); // ✅ Add this

      const res = await api.post("/clusters/create", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccessMsg("Cluster created successfully!");

      setForm({
        name: "",
        city: "",
        area: "",
        meetingDay: "",
        meetingTime: "",
      });
      setMarker(null);
      setAreaSuggestion("");
      setTimeout(() => {
        navigate("/clusters");
      }, 1500);
    } catch (err) {
      alert("Error creating cluster: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">
        ➕ Create a Buying Cluster
      </h2>

      {successMsg && (
        <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          type="text"
          placeholder="Cluster Name"
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          type="text"
          placeholder="City (e.g., Delhi)"
          className="w-full border p-3 rounded-lg"
          required
        />

        <input
          name="area"
          value={form.area}
          onChange={handleChange}
          type="text"
          placeholder="Market Area (e.g., Sarafa Bazar)"
          className="w-full border p-3 rounded-lg"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="meetingDay"
            value={form.meetingDay}
            onChange={handleChange}
            type="text"
            placeholder="Meeting Day (e.g., Monday)"
            className="border p-3 rounded-lg"
            required
          />
          <input
            name="meetingTime"
            value={form.meetingTime}
            onChange={handleChange}
            type="time"
            className="border p-3 rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-2">
            📍 Click or type to select cluster location:
          </label>
          <MapContainer
            center={[22.7196, 75.8577]} // Default: Indore
            zoom={13}
            scrollWheelZoom={true}
            className="h-64 rounded-lg border"
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationPicker onSelect={handleMapClick} />
            {marker && <Marker position={marker} />}
          </MapContainer>

          {marker && (
            <div className="text-sm text-gray-700 mt-2">
              📌 <strong>Selected Coordinates:</strong> {marker[0].toFixed(4)},{" "}
              {marker[1].toFixed(4)} <br />
              🧭 <strong>Suggested Area:</strong>{" "}
              <span className="text-orange-600 font-semibold">
                {areaSuggestion}
              </span>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Cluster"}
        </button>
      </form>
    </div>
  );
};

export default CreateCluster;
