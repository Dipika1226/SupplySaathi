const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Supplier = require("../models/Supplier");
const User = require("../models/User");

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("DB connection error:", err));

const seedSuppliers = async () => {
    try {
        const user = await User.findOne();
        if (!user) {
            console.log("No user found. Please seed a user first.");
            return;
        }

        await Supplier.deleteMany();

        const suppliers = [
            {
                name: "Raj Vegetables",
                city: "Delhi",
                area: "Azadpur Mandi",
                contact: "9876543210",
                category: "vegetables",
                deliverySlots: ["Morning", "Evening"],
                inventory: [
                    { itemName: "Potato", pricePerUnit: 20, quantityAvailable: 100, unit: "kg" },
                    { itemName: "Tomato", pricePerUnit: 25, quantityAvailable: 80, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Fresh Fruit Corner",
                city: "Delhi",
                area: "Ghazipur Mandi",
                contact: "9988776655",
                category: "fruits",
                deliverySlots: ["Morning"],
                inventory: [
                    { itemName: "Apple", pricePerUnit: 100, quantityAvailable: 60, unit: "kg" },
                    { itemName: "Banana", pricePerUnit: 40, quantityAvailable: 90, unit: "dozen" },
                ],
                createdBy: user._id,
            },
            {
                name: "Sharma Spice House",
                city: "Delhi",
                area: "Khari Baoli",
                contact: "9123456789",
                category: "spices",
                deliverySlots: ["Afternoon"],
                inventory: [
                    { itemName: "Turmeric", pricePerUnit: 120, quantityAvailable: 50, unit: "kg" },
                    { itemName: "Chili Powder", pricePerUnit: 150, quantityAvailable: 40, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Daily Dairy Fresh",
                city: "Delhi",
                area: "Okhla",
                contact: "9100001122",
                category: "dairy",
                deliverySlots: ["Morning", "Evening"],
                inventory: [
                    { itemName: "Milk", pricePerUnit: 60, quantityAvailable: 100, unit: "litre" },
                    { itemName: "Paneer", pricePerUnit: 280, quantityAvailable: 40, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Whole Grains Depot",
                city: "Delhi",
                area: "Narela",
                contact: "9012345678",
                category: "grains",
                deliverySlots: ["Afternoon"],
                inventory: [
                    { itemName: "Wheat", pricePerUnit: 25, quantityAvailable: 200, unit: "kg" },
                    { itemName: "Rice", pricePerUnit: 35, quantityAvailable: 150, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Organic Harvests",
                city: "Delhi",
                area: "Pitampura",
                contact: "9356789012",
                category: "vegetables",
                deliverySlots: ["Morning"],
                inventory: [
                    { itemName: "Broccoli", pricePerUnit: 90, quantityAvailable: 50, unit: "kg" },
                    { itemName: "Lettuce", pricePerUnit: 60, quantityAvailable: 30, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Exotic Fruits Hub",
                city: "Delhi",
                area: "Rohini",
                contact: "9345617823",
                category: "fruits",
                deliverySlots: ["Evening"],
                inventory: [
                    { itemName: "Kiwi", pricePerUnit: 180, quantityAvailable: 20, unit: "kg" },
                    { itemName: "Avocado", pricePerUnit: 250, quantityAvailable: 15, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Spice Traders Ltd.",
                city: "Delhi",
                area: "Sadar Bazaar",
                contact: "9367890123",
                category: "spices",
                deliverySlots: ["Afternoon"],
                inventory: [
                    { itemName: "Black Pepper", pricePerUnit: 300, quantityAvailable: 30, unit: "kg" },
                    { itemName: "Cumin", pricePerUnit: 220, quantityAvailable: 25, unit: "kg" },
                ],
                createdBy: user._id,
            },
            {
                name: "Dairy Palace",
                city: "Delhi",
                area: "Lajpat Nagar",
                contact: "9387654321",
                category: "dairy",
                deliverySlots: ["Morning", "Evening"],
                inventory: [
                    { itemName: "Curd", pricePerUnit: 50, quantityAvailable: 70, unit: "kg" },
                    { itemName: "Butter", pricePerUnit: 400, quantityAvailable: 30, unit: "kg" },
                ],
                createdBy: user._id,
            },
        ];

        await Supplier.insertMany(suppliers);
        console.log("✅ 9 Suppliers seeded successfully!");
        process.exit();
    } catch (err) {
        console.error("❌ Seed error:", err);
        process.exit(1);
    }
};

seedSuppliers();
