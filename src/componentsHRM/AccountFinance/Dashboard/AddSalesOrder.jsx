import React, { useState } from "react";
import axios from "axios";

function AddSalesOrder({ onSalesAdded }) {
  const [formData, setFormData] = useState({
    user: "", // Assuming user input can be added
    type: "quote",
    lineItems: [{ product: "", quantity: 1, price: 0, total: 0 }],
    totalAmount: 0,
    status: "pending",
    isRecurring: false,
    recurrenceFrequency: null,
    nextInvoiceDate: null,
    paymentsReceived: 0,
    dueDate: "",
    creditAmount: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLineItems = formData.lineItems.map((item, idx) => {
      if (idx === index) {
        const updatedItem = { ...item, [name]: value };
        updatedItem.total = updatedItem.quantity * updatedItem.price;
        return updatedItem;
      }
      return item;
    });
    setFormData({ ...formData, lineItems: updatedLineItems });
    updateTotalAmount(updatedLineItems);
  };

  const updateTotalAmount = (lineItems) => {
    const totalAmount = lineItems.reduce((acc, item) => acc + item.total, 0);
    setFormData((prev) => ({ ...prev, totalAmount: totalAmount }));
  };

  const addLineItem = () => {
    setFormData((prev) => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        { product: "", quantity: 1, price: 0, total: 0 },
      ],
    }));
  };

  const removeLineItem = (index) => {
    const updatedLineItems = formData.lineItems.filter(
      (_, idx) => idx !== index
    );
    setFormData((prev) => ({ ...prev, lineItems: updatedLineItems }));
    updateTotalAmount(updatedLineItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/sales",
        formData
      );
      // Reset form after submission
      setFormData({
        user: "",
        type: "quote",
        lineItems: [{ product: "", quantity: 1, price: 0, total: 0 }],
        totalAmount: 0,
        status: "pending",
        isRecurring: false,
        recurrenceFrequency: null,
        nextInvoiceDate: null,
        paymentsReceived: 0,
        dueDate: "",
        creditAmount: 0,
      });
      // Notify dashboard to refresh sales
      if (onSalesAdded) {
        onSalesAdded();
      }
    } catch (error) {
      console.error("Error adding sale:", error);
    }
  };

  return (
    <div className="bg-white p-10 w-[60%] mb-20">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Add Sales Order
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Customer Name
          </label>
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="quote">Quote</option>
            <option value="retainer_invoice">Retainer Invoice</option>
            <option value="sales_order">Sales Order</option>
            <option value="invoice">Invoice</option>
            <option value="credit_note">Credit Note</option>
            <option value="payment">Payment</option>
          </select>
        </div>

        <h3 className="text-lg font-semibold mt-4">Items</h3>
        {formData.lineItems.map((item, index) => (
          <div
            key={index}
            className="flex space-x-4 items-center justify-start"
          >
            <div className="flex gap-4 items-center">
              <div className="flex flex-col">
                <label>Product</label>
                <input
                  type="text"
                  name="product"
                  value={item.product}
                  onChange={(e) => handleLineItemChange(index, e)}
                  placeholder="Product"
                  className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(index, e)}
                  placeholder="Quantity"
                  className="w-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={(e) => handleLineItemChange(index, e)}
                  placeholder="Price"
                  className="w-32 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="text-white p-2 rounded-md bg-red-500 mt-6"
                  onClick={() => removeLineItem(index)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="text-blue-500 hover:text-blue-700 font-semibold"
          onClick={addLineItem}
        >
          Add Line Item
        </button>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Due Date
          </label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-lg font-semibold mt-4 justify-end flex ">
          <span>Total Amount:</span>
          <span className=""> {formData.totalAmount}</span>
        </div>

        <button
          type="submit"
          className="w-full bg-cyan-500 text-white py-2 rounded-lg transition duration-300"
        >
          Add Sales Order
        </button>
      </form>
    </div>
  );
}

export default AddSalesOrder;
