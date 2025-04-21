import React, { useState } from "react";

const AuditTrails = () => {
  const [transactions, setTransactions] = useState([
    {
      transactionID: "T-001",
      itemName: "Product A",
      quantity: 20,
      action: "Added",
      date: "01-Oct-2024",
    },
    {
      transactionID: "T-002",
      itemName: "Product B",
      quantity: -10,
      action: "Removed",
      date: "02-Oct-2024",
    },
    {
      transactionID: "T-003",
      itemName: "Product C",
      quantity: 15,
      action: "Added",
      date: "03-Oct-2024",
    },
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Inventory Audit Trails</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">Transaction ID</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Action</th>
            <th className="px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4 py-2">{transaction.transactionID}</td>
              <td className="px-4 py-2">{transaction.itemName}</td>
              <td className="px-4 py-2">{transaction.quantity}</td>
              <td className="px-4 py-2">{transaction.action}</td>
              <td className="px-4 py-2">{transaction.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuditTrails;
