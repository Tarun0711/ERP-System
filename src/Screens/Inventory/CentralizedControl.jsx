import React, { useState } from "react";

const CentralizedControl = () => {
  const [locations, setLocations] = useState([
    {
      locationName: "Warehouse A",
      items: [
        { itemName: "Product A", quantity: 150 },
        { itemName: "Product B", quantity: 80 },
      ],
    },
    {
      locationName: "Warehouse B",
      items: [
        { itemName: "Product A", quantity: 120 },
        { itemName: "Product C", quantity: 60 },
      ],
    },
    {
      locationName: "Warehouse C",
      items: [
        { itemName: "Product B", quantity: 100 },
        { itemName: "Product D", quantity: 40 },
      ],
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Centralized Inventory Control</h1>
      {locations.map((location, index) => (
        <div key={index} className="mb-6">
          <h2 className="text-xl font-semibold mb-2">{location.locationName}</h2>
          <table className="min-w-full table-auto mb-4">
            <thead>
              <tr className="bg-gray-200 text-left text-sm text-gray-700">
                <th className="px-4 py-2">Item Name</th>
                <th className="px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {location.items.map((item, itemIndex) => (
                <tr key={itemIndex} className="border-t hover:bg-gray-100 text-sm">
                  <td className="px-4 py-2">{item.itemName}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default CentralizedControl;
