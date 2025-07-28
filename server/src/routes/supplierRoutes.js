const express = require("express");
const router = express.Router();
const {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier
} = require("../controllers/supplierController");
const { authMiddleware, requireSupplierRole } = require("../middleware/authMiddleware");

// Public
router.get("/", getAllSuppliers);
router.get("/:id", getSupplierById);

// Protected
router.post("/", authMiddleware, requireSupplierRole, createSupplier);
router.put("/:id", authMiddleware, requireSupplierRole, updateSupplier);
router.delete("/:id", authMiddleware, requireSupplierRole, deleteSupplier);

module.exports = router;
