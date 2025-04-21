import React, { useState } from "react";

const ReportingAndAnalytics = () => {
  const [inventoryReports, setInventoryReports] = useState([
    { itemName: "Product A", stockLevel: 80, totalMovements: 30 },
    { itemName: "Product B", stockLevel: 40, totalMovements: 50 },
    { itemName: "Product C", stockLevel: 60, totalMovements: 20 },
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Inventory Reporting & Analytics</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Stock Level</th>
            <th className="px-4 py-2">Total Movements</th>
          </tr>
        </thead>
        <tbody>
          {inventoryReports.map((report, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4 py-2">{report.itemName}</td>
              <td className="px-4 py-2">{report.stockLevel}</td>
              <td className="px-4 py-2">{report.totalMovements}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Analytics</h2>
        <p>Total Items in Stock: {inventoryReports.reduce((acc, item) => acc + item.stockLevel, 0)}</p>
        <p>Total Movements: {inventoryReports.reduce((acc, item) => acc + item.totalMovements, 0)}</p>
      </div>
    </div>
  );
};

export default ReportingAndAnalytics;
