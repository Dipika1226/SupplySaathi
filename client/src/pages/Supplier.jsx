import React, { useEffect, useState } from "react";
import api from "../utils/api";

const CATEGORIES = [
  "all",
  "vegetables",
  "fruits",
  "groceries",
  "dairy",
  "bakery",
  "other",
];

const SupplierCard = ({ supplier }) => {
  const totalInventory = supplier.inventory.length;
  const priceRange = getPriceRange(supplier.inventory);

  function getPriceRange(inventory) {
    const prices = inventory.map((item) => item.pricePerUnit);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    return min === max
      ? `₹${min}/${inventory[0]?.unit || "unit"}`
      : `₹${min}-${max}/${inventory[0]?.unit || "unit"}`;
  }

  return (
    <div className="border rounded-xl shadow-md p-4 w-full sm:w-[320px] bg-white flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-800">{supplier.name}</h2>
            <p className="text-sm text-gray-500">
              {supplier.area}, {supplier.city}
            </p>
          </div>
          <span className="text-sm font-medium text-orange-600 bg-orange-100 rounded px-2 py-1">
            {priceRange}
          </span>
        </div>

        <div className="mt-1 text-xs text-indigo-700 bg-indigo-100 inline-block px-2 py-0.5 rounded">
          {supplier.category}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          📦 {totalInventory} items • 📞 {supplier.contact}
        </div>

        <div className="mt-2 flex flex-wrap gap-1">
          {supplier.deliverySlots.map((slot, idx) => (
            <span
              key={idx}
              className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs"
            >
              {slot}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

const SupplierPage = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [form, setForm] = useState({
    name: "",
    city: "",
    area: "",
    contact: "",
    category: "vegetables",
    deliverySlots: "",
    inventory: "",
  });

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const res = await api.get("/suppliers");
        setSuppliers(res.data);
        setFiltered(res.data);
      } catch (err) {
        console.error("Error fetching suppliers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleCategoryFilter = (e) => {
    const selected = e.target.value;
    setCategoryFilter(selected);
    if (selected === "all") {
      setFiltered(suppliers);
    } else {
      setFiltered(suppliers.filter((s) => s.category === selected));
    }
  };

  const handleFormChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddSupplier = async () => {
    const inventory = form.inventory.split(",").map((item) => {
      const [itemName, price, qty, unit] = item.split("|");
      return {
        itemName: itemName.trim(),
        pricePerUnit: Number(price),
        quantityAvailable: Number(qty),
        unit: unit || "kg",
      };
    });

    const payload = {
      ...form,
      deliverySlots: form.deliverySlots.split(",").map((s) => s.trim()),
      inventory,
    };

    try {
      const res = await api.post("/suppliers", payload);
      setSuppliers([res.data.supplier, ...suppliers]);
      setFiltered([res.data.supplier, ...filtered]);
      setShowModal(false);
      setForm({
        name: "",
        city: "",
        area: "",
        contact: "",
        category: "vegetables",
        deliverySlots: "",
        inventory: "",
      });
    } catch (err) {
      console.error("Failed to add supplier", err);
      alert("Failed to add supplier");
    }
  };

  return (
    <div className="p-6 bg-[#fffdf6] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Suppliers</h1>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded px-3 py-2 text-sm"
            value={categoryFilter}
            onChange={handleCategoryFilter}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat[0].toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            + Add Supplier
          </button>
        </div>
      </div>

      {/* Suppliers Grid */}
      {loading ? (
        <div>Loading...</div>
      ) : filtered.length === 0 ? (
        <div>No suppliers available.</div>
      ) : (
        <div className="flex flex-wrap gap-6">
          {filtered.map((supplier) => (
            <SupplierCard key={supplier._id} supplier={supplier} />
          ))}
        </div>
      )}

      {/* Add Supplier Button at Bottom */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded text-sm"
        >
          + Add Supplier
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start sm:items-center p-4 z-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>

            <input
              className="w-full border mb-2 px-3 py-2 rounded"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleFormChange}
            />
            <input
              className="w-full border mb-2 px-3 py-2 rounded"
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleFormChange}
            />
            <input
              className="w-full border mb-2 px-3 py-2 rounded"
              name="area"
              placeholder="Area"
              value={form.area}
              onChange={handleFormChange}
            />
            <input
              className="w-full border mb-2 px-3 py-2 rounded"
              name="contact"
              placeholder="Contact (10-digit)"
              value={form.contact}
              onChange={handleFormChange}
            />

            <select
              className="w-full border mb-2 px-3 py-2 rounded"
              name="category"
              value={form.category}
              onChange={handleFormChange}
            >
              {CATEGORIES.filter((c) => c !== "all").map((cat) => (
                <option key={cat} value={cat}>
                  {cat[0].toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>

            <input
              className="w-full border mb-2 px-3 py-2 rounded"
              name="deliverySlots"
              placeholder="Delivery Slots (comma separated)"
              value={form.deliverySlots}
              onChange={handleFormChange}
            />

            <textarea
              className="w-full border mb-3 px-3 py-2 rounded"
              name="inventory"
              placeholder="Inventory items: name|price|qty|unit, name|price|qty|unit"
              value={form.inventory}
              onChange={handleFormChange}
            />

            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleAddSupplier}
              >
                Add Supplier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupplierPage;
