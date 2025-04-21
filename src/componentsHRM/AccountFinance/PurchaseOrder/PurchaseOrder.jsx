import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";
import FilterSearchBar from "../../HRM/Utils/FilterSearchBar";

function PurchaseOrder() {
  const [orders, setOrders] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Set the number of orders per page
  const [newOrder, setNewOrder] = useState({
    vendor: "",
    orderDate: "",
    items: [{ product: "", quantity: 1, price: 0, total: 0 }],
    totalAmount: 0,
    status: "draft",
    paymentStatus: "pending",
  });

  useEffect(() => {
    fetchOrders();
    fetchVendors();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/purchase-orders"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const fetchVendors = async () => {
    try {
      const response = await axios.get("https://erp-backend-o5i3.onrender.com/api/v1/vendors");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;

    if (name === "vendor" || name === "orderDate") {
      setNewOrder({ ...newOrder, [name]: value });
    } else if (index !== null) {
      const updatedItems = [...newOrder.items];
      updatedItems[index][name] = value;

      if (name === "quantity" || name === "price") {
        updatedItems[index].total =
          updatedItems[index].quantity * updatedItems[index].price;
      }

      const totalAmount = updatedItems.reduce(
        (sum, item) => sum + item.total,
        0
      );
      setNewOrder({ ...newOrder, items: updatedItems, totalAmount });
    }
  };

  const handleAddLineItem = () => {
    setNewOrder({
      ...newOrder,
      items: [
        ...newOrder.items,
        { product: "", quantity: 1, price: 0, total: 0 },
      ],
    });
  };

  const handleRemoveLineItem = (index) => {
    const updatedItems = newOrder.items.filter((_, i) => i !== index);
    const totalAmount = updatedItems.reduce((sum, item) => sum + item.total, 0);
    setNewOrder({ ...newOrder, items: updatedItems, totalAmount });
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/purchase-orders",
        newOrder
      );
      fetchOrders(); // Refresh order list
      setIsAdding(false);
      setNewOrder({
        vendor: "",
        orderDate: "",
        items: [{ product: "", quantity: 1, price: 0, total: 0 }],
        totalAmount: 0,
        status: "draft",
        paymentStatus: "pending",
      });
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleCheckboxChange = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allOrderIds = orders
        .slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage)
        .map((order) => order._id);
      setSelectedOrders(allOrderIds);
    } else {
      setSelectedOrders([]);
    }
  };

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // CSV Export Feature
  const exportToCSV = () => {
    const csvData = orders.map((order) => ({
      vendor: order.vendor,
      orderDate: new Date(order.orderDate).toLocaleDateString(),
      totalAmount: order.totalAmount.toFixed(2),
      status: order.status,
      paymentStatus: order.paymentStatus,
    }));

    const csv = Papa.unparse(csvData);

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "purchase_orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="text-center mb-4 w-full justify-between flex">
        <div className="flex justify-between">
          <p className="font-serif font-semibold text-gray-700 text-xl">
            / Purchase Order / Order And Bills
          </p>
        </div>
        <div className="text-center mb-4">
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="bg-cyan-500 text-white py-2 px-4 rounded-lg transition duration-300"
          >
            {isAdding ? "Cancel" : "+ New"}
          </button>
          <button
            onClick={exportToCSV}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg transition duration-300 ml-2"
          >
            Export CSV
          </button>
        </div>
      </div>
      {isAdding && (
        <form onSubmit={handleAddOrder} className="mb-4 w-full bg-white p-10">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-2">Enter Vendor</label>
              <input
                name="vendor"
                value={newOrder.vendor}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
                placeholder="Enter Vendor Name"
              />
            </div>
            <div className="flex flex-col">
              <label className=" font-semibold mb-2 text-sm">Date</label>
              <input
                type="date"
                name="orderDate"
                value={newOrder.orderDate}
                onChange={handleInputChange}
                required
                className="border p-2 rounded"
              />
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-2">Line Items</h3>
              {newOrder.items.map((item, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    type="text"
                    name="product"
                    value={item.product}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Product"
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Quantity"
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="price"
                    value={item.price}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Price"
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="total"
                    value={item.total}
                    readOnly
                    placeholder="Total"
                    className="border p-2 rounded bg-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveLineItem(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddLineItem}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Add Line Item
              </button>
            </div>

            <div className="font-semibold text-lg flex justify-end">
              Total Amount: {newOrder.totalAmount.toFixed(2)}
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Add Purchase Order
            </button>
          </div>
        </form>
      )}

      {/* Conditionally render the purchase order list if not adding */}
      {!isAdding && (
        <div className="p-8 ">
          <h2 className="text-xl font-semibold mb-4">Purchase Orders</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left p-2 border-b">Select</th>
                <th className="text-left p-2 border-b">Vendor</th>
                <th className="text-left p-2 border-b">Order Date</th>
                <th className="text-left p-2 border-b">Total Amount</th>
                <th className="text-left p-2 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td className="p-2 border-b">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleCheckboxChange(order._id)}
                    />
                  </td>
                  <td className="p-2 border-b">{order.vendor}</td>
                  <td className="p-2 border-b">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="p-2 border-b">
                    {order.totalAmount.toFixed(2)}
                  </td>
                  <td className="p-2 border-b">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 absolute w-[75%] bottom-10">
            <button
              onClick={prevPage}
              className="mx-2 py-1 px-4 rounded-lg"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <p>
              Page {currentPage} of {Math.ceil(orders.length / ordersPerPage)}
            </p>
            <button
              onClick={nextPage}
              className="mx-2 py-1 px-4 rounded-lg"
              disabled={
                currentPage === Math.ceil(orders.length / ordersPerPage)
              }
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseOrder;
