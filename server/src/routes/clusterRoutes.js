const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  createCluster,
  getAllClusters,
  getNearbyClusters,
  joinCluster,
} = require("../controllers/clusterController");

router.get("/", getAllClusters);         // Public
router.get("/nearby", getNearbyClusters); // Public

router.post("/create", auth, createCluster); // Authenticated
router.post("/join/:id", auth, joinCluster); // Authenticated

module.exports = router;
