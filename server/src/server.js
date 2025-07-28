const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const clusterRoutes = require("./routes/clusterRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/clusters", clusterRoutes);
app.use("/api/suppliers", supplierRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("Mongo Error:", err));
