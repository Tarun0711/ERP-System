import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const SalesOrdersPage = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    date: "",
    salesOrder: "",
    reference: "",
    customerName: "",
    status: "DRAFT",
    amount: "",
    invoiced: false,
    payment: false,
  });

  useEffect(() => {
    const fetchSalesOrders = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/account-fianance/purchase-orders"
        );
        setSalesOrders(response.data); // Assuming the response data is an array
      } catch (error) {
        console.error("Error fetching sales orders:", error);
      }
    };

    fetchSalesOrders();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  const getStatusColor = (status) => {
    switch (status) {
      case "APPROVAL OVERDUE":
        return "text-orange-500";
      case "overdue":
        return "text-red-500";
      case "draft":
        return "text-red-400";
      case "invoiced":
        return "text-blue-500";
      case "void":
        return "text-gray-500";
      case "approved":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSalesOrders((prevOrders) => [...prevOrders, newOrder]);
    closeModal();
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">All Sales Orders</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search"
            className="border rounded px-3 py-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            + New
          </button>
        </div>
      </div>

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left text-sm text-gray-700">
            <th className="px-4 py-2">DATE</th>
            <th className="px-4 py-2">SALES ORDER#</th>
            <th className="px-4 py-2">REFERENCE#</th>
            <th className="px-4 py-2">CUSTOMER NAME</th>
            <th className="px-4 py-2">STATUS</th>
            <th className="px-4 py-2">AMOUNT</th>
            <th className="px-4 py-2">INVOICED</th>
            <th className="px-4 py-2">PAYMENT</th>
          </tr>
        </thead>
        <tbody>
          {salesOrders.map((order, index) => (
            <tr key={index} className="border-t hover:bg-gray-100 text-md">
              <td className="px-4 py-2">
                {moment(order.createdAt).format("MM/DD/YYYY")}
              </td>
              <td className="px-4 py-2 text-blue-500">{`SO-${String(index + 1).padStart(2, "0")}`}</td>
              <td className="px-4 py-2">
              {`#${String(index + 1).padStart(4, "0")}`}
              </td>
              <td className="px-4 py-2">{order.customerName}</td>
              <td className={`px-4 py-2 ${getStatusColor(order.status)}`}>
                {order.status}
              </td>
              <td className="px-4 py-2">{`${order.totalAmount}RS`}</td>
              <td className="px-4 py-2 text-center">
                {order.invoiced ? (
                  <span className="text-green-500">●</span>
                ) : (
                  <span className="text-gray-400">●</span>
                )}
              </td>
              <td className="px-4 py-2 text-center">{order.payment}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-1/3">
            <h2 className="text-xl font-semibold mb-4">New Sales Order</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-sm mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={newOrder.date}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Sales Order#</label>
                <input
                  type="text"
                  name="salesOrder"
                  value={newOrder.salesOrder}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Reference#</label>
                <input
                  type="text"
                  name="reference"
                  value={newOrder.reference}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={newOrder.customerName}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Status</label>
                <select
                  name="status"
                  value={newOrder.status}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="APPROVAL OVERDUE">APPROVAL OVERDUE</option>
                  <option value="OVERDUE">OVERDUE</option>
                  <option value="INVOICED">INVOICED</option>
                  <option value="VOID">VOID</option>
                  <option value="APPROVED">APPROVED</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-2">Amount</label>
                <input
                  type="text"
                  name="amount"
                  value={newOrder.amount}
                  onChange={handleInputChange}
                  className="border px-3 py-2 rounded w-full"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOrdersPage;
