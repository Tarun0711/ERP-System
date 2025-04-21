import React, { useState, useEffect } from "react";
import axios from "axios";
import AddSalesOrder from "./AddSalesOrder";
import { useNavigate } from "react-router-dom";

function SalesDashboard() {
  const [salesList, setSalesList] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSales, setSelectedSales] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const response = await axios.get(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/sales"
      );
      setSalesList(response.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleSalesAdded = () => {
    fetchSales();
    setIsAdding(false);
  };

  const handleEdit = (id) => {
    navigate(`/sales/edit/${id}`);
  };

  const handleUserClick = (sale) => {
    setSelectedSale(sale);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSale(null);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (e, saleId) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedSales([...selectedSales, saleId]);
    } else {
      setSelectedSales(selectedSales.filter((id) => id !== saleId));
    }
  };

  // Handle select all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allSalesIds = salesList.map((sale) => sale._id);
      setSelectedSales(allSalesIds);
    } else {
      setSelectedSales([]);
    }
  };

  // Calculate displayed sales for the current page
  const indexOfLastSale = currentPage * itemsPerPage;
  const indexOfFirstSale = indexOfLastSale - itemsPerPage;
  const currentSales = salesList.slice(indexOfFirstSale, indexOfLastSale);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Go to the next page
  const nextPage = () => {
    if (currentPage < Math.ceil(salesList.length / itemsPerPage)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Go to the previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 h-[calc(100vh-4rem)] overflow-auto mb-52 w-full flex flex-col p-3">
      {isAdding ? (
        <div className="">
          <div className=" justify-between flex w-full mb-4">
            <p className="font-serif font-semibold text-gray-700 text-xl">
              / Account And Finance / Sales Management
            </p>
            <button
              onClick={() => setIsAdding(false)}
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition duration-300"
            >
              Cancel
            </button>
          </div>
          <AddSalesOrder onSalesAdded={handleSalesAdded} />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="font-serif font-semibold text-gray-700 text-xl">
              / Account And Finance / Sales Management
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-800 transition duration-300"
            >
              + New
            </button>
          </div>

          <div className="p-8">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="py-2 px-4 text-left">
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={
                        selectedSales.length === salesList.length &&
                        salesList.length > 0
                      }
                    />
                  </th>
                  <th className="py-2 px-4 text-left">Customer</th>
                  <th className="py-2 px-4 text-left">Type</th>
                  <th className="py-2 px-4 text-left">Total Amount</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentSales.map((sale) => (
                  <tr
                    key={sale._id}
                    onClick={() => handleUserClick(sale)}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    <td className="py-2 px-4 border-b">
                      <input
                        type="checkbox"
                        onClick={(e) => handleCheckboxChange(e, sale._id)}
                        checked={selectedSales.includes(sale._id)}
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{sale.user}</td>
                    <td className="py-2 px-4 border-b">
                      {sale.type.charAt(0).toUpperCase() + sale.type.slice(1)}
                    </td>
                    <td className="py-2 px-4 border-b">{sale.totalAmount}</td>
                    <td className="py-2 px-4 border-b">
                      {sale.status.charAt(0).toUpperCase() +
                        sale.status.slice(1)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(sale._id);
                        }}
                        className="bg-green-500 p-2 rounded-md text-white mr-3"
                      >
                        Edit
                      </button>
                      {/* <button className="bg-red-500 p-2 rounded-md text-white">
                        Delete
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center items-center absolute bottom-10 w-[70%]">
            <div className="flex justify-around w-full">
              <span className="text-gray-700">
                Showing <strong>{indexOfFirstSale + 1}</strong> to{" "}
                <strong>{Math.min(indexOfLastSale, salesList.length)} </strong>
                of <strong>{salesList.length}</strong> entries
              </span>
              <div className="flex items-center">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`mx-2 py-1 rounded-lg ${
                    currentPage === 1 ? " cursor-not-allowed" : ""
                  }`}
                >
                  &lt;
                </button>
                <span className="mx-2">
                  {currentPage} of {Math.ceil(salesList.length / itemsPerPage)}
                </span>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage >= Math.ceil(salesList.length / itemsPerPage)
                  }
                  className={`mx-2 py-1 rounded-lg ${
                    currentPage >= Math.ceil(salesList.length / itemsPerPage)
                      ? ""
                      : ""
                  }`}
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
          {/* Modal for Order Details */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 w-full">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
                {selectedSale && (
                  <div>
                    <p>
                      <strong>Customer:</strong> {selectedSale.userFirstName}
                    </p>
                    <p>
                      <strong>Type:</strong> {selectedSale.type}
                    </p>
                    <p>
                      <strong>Total Amount:</strong> {selectedSale.totalAmount}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedSale.status}
                    </p>
                  </div>
                )}
                <div className="mt-4">
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default SalesDashboard;
