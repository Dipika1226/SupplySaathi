const Supplier = require("../models/Supplier");

exports.createSupplier = async (req, res) => {
    try {
        const {
            name,
            city,
            area,
            contact,
            category,
            deliverySlots,
            inventory,
        } = req.body;

        if (!name || !city || !area || !contact || !category || !deliverySlots || !inventory) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newSupplier = await Supplier.create({
            name,
            city,
            area,
            contact,
            category,
            deliverySlots,
            inventory,
            createdBy: req.user._id,
        });

        res.status(201).json({ message: "Supplier created", supplier: newSupplier });
    } catch (err) {
        console.error("Create Supplier Error:", err);
        res.status(500).json({ error: "Failed to create supplier" });
    }
};

exports.getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.find().sort({ createdAt: -1 });
        res.json(suppliers);
    } catch (err) {
        console.error("Get All Suppliers Error:", err);
        res.status(500).json({ error: "Failed to fetch suppliers" });
    }
};

exports.getSupplierById = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });
        res.json(supplier);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch supplier" });
    }
};

exports.updateSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });

        if (supplier.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized to update this supplier" });
        }

        const updatedData = req.body;
        Object.assign(supplier, updatedData);
        await supplier.save();

        res.json({ message: "Supplier updated", supplier });
    } catch (err) {
        console.error("Update Supplier Error:", err);
        res.status(500).json({ error: "Failed to update supplier" });
    }
};

exports.deleteSupplier = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);
        if (!supplier) return res.status(404).json({ error: "Supplier not found" });

        if (supplier.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: "Unauthorized to delete this supplier" });
        }

        await Supplier.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplier deleted" });
    } catch (err) {
        res.status(500).json({ error: "Failed to delete supplier" });
    }
};
