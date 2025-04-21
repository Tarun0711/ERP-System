import React, { useState } from "react";

const StockTransfer = () => {
  const [locations, setLocations] = useState([
    "Warehouse A",
    "Warehouse B",
    "Warehouse C",
  ]);

  const [transferData, setTransferData] = useState({
    fromLocation: "",
    toLocation: "",
    itemName: "",
    quantity: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTransferData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTransfer = () => {
    if (transferData.fromLocation && transferData.toLocation && transferData.itemName && transferData.quantity > 0) {
      alert(`Stock transferred: ${transferData.quantity} units of ${transferData.itemName} from ${transferData.fromLocation} to ${transferData.toLocation}`);
      // Logic to update the inventory in both locations should be added here (API calls)
    } else {
      alert("Please fill in all fields with valid data.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Stock Transfer</h1>
      <div className="mb-4">
        <label className="block text-sm mb-2">From Location</label>
        <select
          name="fromLocation"
          value={transferData.fromLocation}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">To Location</label>
        <select
          name="toLocation"
          value={transferData.toLocation}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
        >
          <option value="">Select Location</option>
          {locations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Item Name</label>
        <input
          type="text"
          name="itemName"
          value={transferData.itemName}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm mb-2">Quantity</label>
        <input
          type="number"
          name="quantity"
          value={transferData.quantity}
          onChange={handleInputChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleTransfer}
      >
        Transfer Stock
      </button>
    </div>
  );
};

export default StockTransfer;
