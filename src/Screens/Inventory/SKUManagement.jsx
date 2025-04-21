import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://erp-backend-o5i3.onrender.com/api/v1/sku"; 

const SKUManagement = () => {
  const [skuData, setSkuData] = useState([]);
  const [newSku, setNewSku] = useState({
    sku: "",
    itemName: "",
    category: "",
    stockQuantity: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch SKU data from the backend
  const fetchSkuData = async () => {
    try {
      const response = await axios.get(API_URL);
      setSkuData(response.data);
    } catch (error) {
      console.error("Error fetching SKU data:", error);
    }
  };

  useEffect(() => {
    fetchSkuData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSku((prevSku) => ({
      ...prevSku,
      [name]: value,
    }));
  };

  // Add a new SKU
  const addSku = async () => {
    if (newSku.sku && newSku.itemName && newSku.category && newSku.stockQuantity) {
      try {
        const response = await axios.post(API_URL, newSku);
        setSkuData([...skuData, response.data]); // Add the new SKU to the state
        setNewSku({ sku: "", itemName: "", category: "", stockQuantity: "" });
        setIsModalOpen(false); // Close modal after adding
      } catch (error) {
        console.error("Error adding SKU:", error);
      }
    }
  };

  // Delete an SKU
  const deleteSku = async (sku) => {
    try {
      await axios.delete(`${API_URL}/${sku}`); // Send delete request to the backend
      setSkuData(skuData.filter((item) => item.sku !== sku)); // Remove from state
    } catch (error) {
      console.error("Error deleting SKU:", error);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header with 'New' Button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">SKU Management</h2>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={toggleModal}
        >
         + New
        </button>
      </div>

      {/* SKU Table */}
      <div className="overflow-x-auto mb-6">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
          <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock Quantity</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {skuData.map((item) => (
              <tr key={item.sku} className="border-b text-center border-gray-200 hover:bg-gray-100">
                <td className="px-4 py-2">{item.sku}</td>
                <td className="px-4 py-2">{item.itemName}</td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.stockQuantity}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteSku(item.sku)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add SKU Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add New SKU</h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <input
                type="text"
                name="sku"
                placeholder="SKU"
                value={newSku.sku}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="itemName"
                placeholder="Item Name"
                value={newSku.itemName}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="category"
                placeholder="Category"
                value={newSku.category}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="stockQuantity"
                placeholder="Stock Quantity"
                value={newSku.stockQuantity}
                onChange={handleInputChange}
                className="border p-2 rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={addSku}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Add
              </button>
              <button
                onClick={toggleModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SKUManagement;
