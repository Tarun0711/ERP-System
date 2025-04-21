import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const PurchaseOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/account-fianance/sales"
        );
        setOrders(response.data); // Assuming the API returns an array of orders
      } catch (err) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "text-blue-500";
      case "closed":
        return "text-green-500";
      case "partillay billed":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Purchase Orders</h1>
        <button className="bg-blue-500 text-white px-4 p-1 rounded">
          + New
        </button>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">PURCHASE ORDER#</th>
            <th className="px-4 py-2">REFERENCE#</th>
            <th className="px-4 py-2">VENDOR NAME</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">AMOUNT</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-sm">
              <td className="px-4 py-2">
                {moment(order.createdAt).format("MM/DD/YYYY")}
              </td>
              <td className="px-4 py-2 text-blue-500">
                {order.purchaseOrderNumber}
              </td>
              <td className="px-4 py-2">{order.referenceNumber}</td>
              <td className="px-4 py-2">{order.vendorName}</td>
              <td className={`px-4 py-2 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="px-4 py-2">{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseOrdersPage;
