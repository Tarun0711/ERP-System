import React, { useState } from "react";

const CycleCounting = () => {
  const [items, setItems] = useState([
    { itemName: "Product A", systemCount: 100, physicalCount: 0 },
    { itemName: "Product B", systemCount: 50, physicalCount: 0 },
    { itemName: "Product C", systemCount: 75, physicalCount: 0 },
  ]);

  const handleInputChange = (index, value) => {
    const updatedItems = items.map((item, i) =>
      i === index ? { ...item, physicalCount: value } : item
    );
    setItems(updatedItems);
  };

  const handleSave = () => {
    // Logic to save the cycle counts and update the system (API call)
    alert("Cycle count has been saved!");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Cycle Counting</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">System Count</th>
            <th className="px-4 py-2">Physical Count</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4 py-2">{item.itemName}</td>
              <td className="px-4 py-2">{item.systemCount}</td>
              <td className="px-4 py-2">
                <input
                  type="number"
                  value={item.physicalCount}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  className="border px-2 py-1 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
        onClick={handleSave}
      >
        Save Counts
      </button>
    </div>
  );
};

export default CycleCounting;
