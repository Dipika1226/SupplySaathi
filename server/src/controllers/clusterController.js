const Cluster = require("../models/Cluster");

exports.createCluster = async (req, res) => {
  try {
    const {
      name, city, area, meetingDay, meetingTime, coordinates, category
    } = req.body;

    if (!name || !city || !area || !meetingDay || !meetingTime || !coordinates?.coordinates) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const cluster = await Cluster.create({
      name,
      city,
      area,
      meetingDay,
      meetingTime,
      coordinates,
      category: category || "general",
      createdBy: req.user._id,
      joinedUsers: [req.user._id],
      vendorsGoing: 1,
    });

    res.status(201).json({ message: "Cluster created", cluster });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to create cluster" });
  }
};

exports.getAllClusters = async (req, res) => {
  try {
    const clusters = await Cluster.find().sort({ createdAt: -1 });
    res.json(clusters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch clusters" });
  }
};

exports.getNearbyClusters = async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) return res.status(400).json({ error: "Missing coordinates" });

  try {
    const clusters = await Cluster.find({
      coordinates: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: 5000,
        },
      },
    });

    res.json(clusters);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch nearby clusters" });
  }
};

exports.joinCluster = async (req, res) => {
  try {
    const cluster = await Cluster.findById(req.params.id);
    if (!cluster) return res.status(404).json({ error: "Cluster not found" });

    if (cluster.joinedUsers.includes(req.user._id)) {
      return res.status(400).json({ error: "Already joined" });
    }

    cluster.joinedUsers.push(req.user._id);
    cluster.vendorsGoing += 1;

    await cluster.save();
    res.json({ message: "Joined successfully", cluster });
  } catch (err) {
    res.status(500).json({ error: "Failed to join cluster" });
  }
};
