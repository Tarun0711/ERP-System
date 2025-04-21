import React, { useState } from "react";

const SalesReturnsPage = () => {
  // Sample data for sales returns
  const [salesReturns, setSalesReturns] = useState([
    {
      date: "24 Jan 2024",
      rmaNumber: "RMA-00",
      salesOrder: "SO-00",
      customerName: "Rod",
      status: "APPROVED",
      receiveStatus: "",
      refundStatus: "",
      returned: false,
    },
    {
      date: "24 Jan 2024",
      rmaNumber: "RMA-01",
      salesOrder: "SO-01",
      customerName: "Hillard",
      status: "APPROVED",
      receiveStatus: "",
      refundStatus: "",
      returned: false,
    },
    {
      date: "24 Jan 2024",
      rmaNumber: "RMA-02",
      salesOrder: "SO-02",
      customerName: "Lexi",
      status: "APPROVED",
      receiveStatus: "",
      refundStatus: "",
      returned: false,
    },
  ]);

  // Handle the returned status update
  const handleReturnedUpdate = (index) => {
    const updatedSalesReturns = salesReturns.map((returnOrder, i) =>
      i === index ? { ...returnOrder, returned: !returnOrder.returned } : returnOrder
    );
    setSalesReturns(updatedSalesReturns);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">Pending Sales Returns</h1>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">RMA#</th>
            <th className="px-4 py-2">SALES ORDER#</th>
            <th className="px-4 py-2">CUSTOMER NAME</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">RECEIVE STATUS</th>
            <th className="px-4 py-2">REFUND STATUS</th>
            <th className="px-4 py-2">RETURNED</th>
          </tr>
        </thead>
        <tbody>
          {salesReturns.map((returnOrder, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4  py-2">{returnOrder.date}</td>
              <td className="px-4  py-2 text-blue-500">{returnOrder.rmaNumber}</td>
              <td className="px-4  py-2">{returnOrder.salesOrder}</td>
              <td className="px-4  py-2">{returnOrder.customerName}</td>
              <td className="px-4  py-2 text-green-500">{returnOrder.status}</td>
              <td className="px-4  py-2">{returnOrder.receiveStatus || "-"}</td>
              <td className="px-4  py-2">{returnOrder.refundStatus || "-"}</td>
              <td className="px-4 py-2 text-center">
                -
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesReturnsPage;
