import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { useSelector } from "react-redux";
import { FaUser, FaClock } from "react-icons/fa";
import { BsChatDots, BsBell } from "react-icons/bs";

export default function Clusters() {
  const [clusters, setClusters] = useState([]);
  const [joinedClusterIds, setJoinedClusterIds] = useState([]);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const fetchClusters = async () => {
      try {
        const res = await api.get("/clusters/");
        const allClusters = res.data;
        setClusters(allClusters);

        if (user && user._id) {
          const joinedIds = allClusters
            .filter((cluster) =>
              cluster.joinedUsers?.some(
                (u) => u === user._id || u._id === user._id
              )
            )
            .map((c) => c._id);
          setJoinedClusterIds(joinedIds);
        }
      } catch (err) {
        console.error("Error fetching clusters:", err);
      }
    };
    fetchClusters();
  }, [user]);

  const joinCluster = async (clusterId) => {
    if (joinedClusterIds.includes(clusterId)) return;

    try {
      await api.post(`/clusters/join/${clusterId}`);
      alert("Joined successfully!");
      setJoinedClusterIds((prev) => [...prev, clusterId]);
    } catch (err) {
      console.error("Join error:", err.response?.data || err.message);
      alert("Error joining cluster.");
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-700";
      case "joining":
        return "bg-blue-100 text-blue-700";
      case "planning":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 p-6">
      <h2 className="text-3xl font-bold mb-6 text-orange-800">
        🧑‍🤝‍🧑 Vendor Clusters
      </h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clusters.map((cluster) => {
          const isJoined = joinedClusterIds.includes(cluster._id);
          const statusBadge = cluster.status ? (
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${getStatusColor(
                cluster.status
              )}`}
            >
              {cluster.status}
            </span>
          ) : null;

          return (
            <div
              key={cluster._id}
              className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {cluster.name}
                  </h3>
                  {cluster.area && (
                    <p className="text-sm text-gray-600">{cluster.area}</p>
                  )}
                </div>
                {statusBadge}
              </div>

              {/* Info */}
              <div className="space-y-2 mt-4">
                <p className="flex items-center gap-2 text-gray-700 text-sm">
                  <FaUser className="text-orange-500" />
                  {cluster.vendorsGoing || 1} vendors going
                </p>
                {cluster.meetingDay && cluster.meetingTime && (
                  <p className="flex items-center gap-2 text-gray-700 text-sm">
                    <FaClock className="text-orange-500" />
                    {cluster.meetingDay} {cluster.meetingTime}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="mt-5 flex items-center gap-3">
                <button
                  disabled={isJoined}
                  onClick={() => joinCluster(cluster._id)}
                  className={`w-full py-2 text-sm font-medium rounded-lg ${
                    isJoined
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-500 text-white hover:bg-green-600"
                  }`}
                >
                  {isJoined ? "Joined" : "Join Now"}
                </button>
                <button className="text-gray-600 hover:text-orange-500">
                  <BsChatDots size={18} />
                </button>
                <button className="text-gray-600 hover:text-orange-500">
                  <BsBell size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-2xl p-6 text-white flex justify-between items-center shadow-lg">
        <div>
          <h3 className="text-xl font-bold mb-1">Can’t find a cluster?</h3>
          <p>Create your own and invite vendors</p>
        </div>
        <Link
          to="/create-cluster"
          className="bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-100"
        >
          + Create Cluster
        </Link>
      </div>
    </div>
  );
}
