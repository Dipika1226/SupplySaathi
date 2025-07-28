const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");

const {
  createCluster,
  getAllClusters,
  getNearbyClusters,
  joinCluster,
} = require("../controllers/clusterController");

router.get("/", getAllClusters);               // Public
router.get("/nearby", getNearbyClusters);      // Public

router.post("/create", authMiddleware, createCluster);  // Authenticated
router.post("/join/:id", authMiddleware, joinCluster);  // Authenticated

module.exports = router;
