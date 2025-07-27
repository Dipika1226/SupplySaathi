"use client";

import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../utils/userSlice";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser(null));
    navigate("/auth");
  };

  const user = {
    name: "Rajesh Kumar",
    business: "Delhi Chaat Corner",
    phone: "+91 98765 43210",
    location: "Karol Bagh, Delhi",
    joinDate: "March 2024",
    rating: 4.7,
    totalSavings: 25000,
    clustersJoined: 8,
    tripsCompleted: 15,
  };

  const recentActivity = [
    {
      id: "1",
      type: "cluster_joined",
      title: "Joined Chandni Chowk Group",
      time: "2 hours ago",
      icon: "ri-group-fill",
      color: "green",
    },
    {
      id: "2",
      type: "trip_completed",
      title: "Completed trip to Azadpur Mandi",
      time: "1 day ago",
      icon: "ri-check-fill",
      color: "blue",
    },
    {
      id: "3",
      type: "supplier_rated",
      title: "Rated Raj Vegetables - 5 stars",
      time: "2 days ago",
      icon: "ri-star-fill",
      color: "yellow",
    },
    {
      id: "4",
      type: "savings_earned",
      title: "Saved ₹2,500 on bulk purchase",
      time: "3 days ago",
      icon: "ri-money-dollar-circle-fill",
      color: "purple",
    },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case "green":
        return "bg-green-100 text-green-600";
      case "blue":
        return "bg-blue-100 text-blue-600";
      case "yellow":
        return "bg-yellow-100 text-yellow-600";
      case "purple":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 mt-14">
      {/* Main Content */}
      <div className="pt-4 md:pt-8 pb-24 md:pb-8">
        {/* Profile Header */}
        <div className="mx-4 md:mx-8 mb-6">
          <div className="bg-white rounded-3xl p-6 shadow-lg">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                <i className="ri-user-fill text-4xl text-white"></i>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.name}
                </h1>
                <p className="text-lg text-gray-600 mb-2">{user.business}</p>
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-6">
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-2">
                      <i className="ri-phone-fill text-green-600"></i>
                    </div>
                    <span className="text-gray-700">{user.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mr-2">
                      <i className="ri-map-pin-fill text-blue-600"></i>
                    </div>
                    <span className="text-gray-700">{user.location}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center mr-2">
                      <i className="ri-calendar-fill text-purple-600"></i>
                    </div>
                    <span className="text-gray-700">
                      Member since {user.joinDate}
                    </span>
                  </div>
                </div>
              </div>
              <button className="bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap">
                <div className="w-5 h-5 inline-block mr-2">
                  <i className="ri-edit-fill"></i>
                </div>
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="mx-4 md:mx-8 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-star-fill text-2xl text-yellow-600"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {user.rating}
              </div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-money-dollar-circle-fill text-2xl text-green-600"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                ₹{user.totalSavings.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Savings</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-group-fill text-2xl text-blue-600"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {user.clustersJoined}
              </div>
              <div className="text-sm text-gray-600">Clusters Joined</div>
            </div>
            <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <i className="ri-map-pin-fill text-2xl text-purple-600"></i>
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {user.tripsCompleted}
              </div>
              <div className="text-sm text-gray-600">Trips Completed</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mx-4 md:mx-8 mb-6">
          <div className="bg-white rounded-3xl p-2 shadow-lg">
            <div className="flex space-x-1">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "profile"
                    ? "bg-orange-600 text-white"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <div className="w-5 h-5 inline-block mr-2">
                  <i className="ri-user-fill"></i>
                </div>
                Profile
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "activity"
                    ? "bg-orange-600 text-white"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <div className="w-5 h-5 inline-block mr-2">
                  <i className="ri-history-fill"></i>
                </div>
                Activity
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex-1 py-3 px-4 rounded-2xl font-semibold transition-colors whitespace-nowrap ${
                  activeTab === "settings"
                    ? "bg-orange-600 text-white"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <div className="w-5 h-5 inline-block mr-2">
                  <i className="ri-settings-fill"></i>
                </div>
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mx-4 md:mx-8">
          {activeTab === "profile" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Business Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.business}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user.phone}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      defaultValue={user.location}
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
                <button className="mt-6 bg-orange-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center p-4 bg-gray-50 rounded-2xl"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${getColorClasses(
                        activity.color
                      )}`}
                    >
                      <i className={`${activity.icon} text-xl`}></i>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Notifications
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Cluster Invitations
                      </p>
                      <p className="text-sm text-gray-600">
                        Get notified when invited to clusters
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-orange-600 rounded-full p-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        Trip Reminders
                      </p>
                      <p className="text-sm text-gray-600">
                        Remind me about upcoming trips
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-orange-600 rounded-full p-1">
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">
                        New Suppliers
                      </p>
                      <p className="text-sm text-gray-600">
                        Notify about new suppliers in my area
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full p-1">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Account
                </h3>
                <div className="space-y-4">
                  <button className="w-full text-left p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-shield-user-fill text-blue-600"></i>
                      </div>
                      <span className="font-semibold text-gray-800">
                        Privacy Settings
                      </span>
                    </div>
                  </button>
                  <button className="w-full text-left p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-customer-service-fill text-green-600"></i>
                      </div>
                      <span className="font-semibold text-gray-800">
                        Help & Support
                      </span>
                    </div>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left p-4 bg-red-50 rounded-2xl hover:bg-red-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                        <i className="ri-logout-box-fill text-red-600"></i>
                      </div>
                      <span className="font-semibold text-red-800">Logout</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
