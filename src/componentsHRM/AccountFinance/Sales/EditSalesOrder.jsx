import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditSalesOrder() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSale = async () => {
      try {
        const response = await axios.get(
          `https://erp-backend-o5i3.onrender.com/api/account-fianance/sales/${id}`
        );
        setSale(response.data);
      } catch (error) {
        setError("Error fetching sale details");
      } finally {
        setLoading(false);
      }
    };

    fetchSale();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  const handleLineItemChange = (index, e) => {
    const { name, value } = e.target;
    const updatedLineItems = sale.lineItems.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setSale((prevSale) => ({
      ...prevSale,
      lineItems: updatedLineItems,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://erp-backend-o5i3.onrender.com/api/account-fianance/sales/${id}`,
        sale
      );
      navigate("/");
    } catch (error) {
      setError("Error updating sale");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex-grow bg-gray-100 h-[calc(100vh-4rem)] overflow-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Customer</label>
          <input
            type="text"
            name="userFirstName"
            value={sale.user}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Type</label>
          <input
            type="text"
            name="type"
            value={sale.type}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Total Amount</label>
          <input
            type="number"
            name="totalAmount"
            value={sale.totalAmount}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status</label>
          <input
            type="text"
            name="status"
            value={sale.status}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Line Items
        </h2>
        {sale.lineItems.map((item, index) => (
          <div key={item._id} className="mb-4 border p-4 rounded">
            <div className="mb-2">
              <label className="block text-gray-700">Product</label>
              <input
                type="text"
                name="product"
                value={item.product}
                onChange={(e) => handleLineItemChange(index, e)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleLineItemChange(index, e)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={item.price}
                onChange={(e) => handleLineItemChange(index, e)}
                className="w-full border border-gray-300 p-2 rounded"
                required
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Total</label>
              <input
                type="number"
                name="total"
                value={item.total}
                onChange={(e) => handleLineItemChange(index, e)}
                className="w-full border border-gray-300 p-2 rounded"
                required
                readOnly
              />
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditSalesOrder;
