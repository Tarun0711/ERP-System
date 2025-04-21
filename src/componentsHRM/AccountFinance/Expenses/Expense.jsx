import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterSearchBar from "../../HRM/Utils/FilterSearchBar";
import Papa from "papaparse";

function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    toWhom: "",
    receipt: "",
    status: "pending",
    paidBy: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [selectedExpenses, setSelectedExpenses] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/expenses"
      );
      setExpenses(response.data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/expenses",
        newExpense
      );
      fetchExpenses();
      setIsAdding(false);
      setNewExpense({
        description: "",
        amount: "",
        toWhom: "",
        receipt: "",
        status: "pending",
        paidBy: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(
    indexOfFirstExpense,
    indexOfLastExpense
  );

  const nextPage = () => {
    if (currentPage < Math.ceil(expenses.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle checkbox selection for each expense
  const handleCheckboxChange = (e, expenseId) => {
    e.stopPropagation();
    if (e.target.checked) {
      setSelectedExpenses([...selectedExpenses, expenseId]);
    } else {
      setSelectedExpenses(selectedExpenses.filter((id) => id !== expenseId));
    }
  };

  // Handle select all checkboxes
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allExpenseIds = expenses.map((expense) => expense._id);
      setSelectedExpenses(allExpenseIds);
    } else {
      setSelectedExpenses([]);
    }
  };
  const exportToCSV = () => {
    // Check if there are selected expenses
    if (selectedExpenses.length === 0) {
      alert("No expenses selected for export.");
      return;
    }

    // Map selected expenses to the desired CSV format
    const csvData = selectedExpenses
      .map((expenseId) => {
        const expense = expenses.find((exp) => exp._id === expenseId);
        // Ensure that the expense exists before returning its data
        if (expense) {
          return {
            description: expense.description,
            amount: parseFloat(expense.amount).toFixed(2), // Ensure amount is formatted as a number
            toWhom: expense.toWhom,
            receipt: expense.receipt || "N/A", // Handle optional receipt field
            status: expense.status,
            paidBy: expense.paidBy,
            date: new Date(expense.date).toLocaleDateString(),
          };
        }
        return null; // Return null if the expense is not found
      })
      .filter(Boolean); // Filter out any null entries

    // Check if there is any valid csvData to export
    if (csvData.length === 0) {
      alert("No valid expenses found for export.");
      return;
    }

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="text-center mb-4 w-full justify-between flex">
        <div className="flex justify-between">
          <p className="font-serif font-semibold text-gray-700 text-xl">
            / Expense Management
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

      {isAdding ? (
        <form
          onSubmit={handleAddExpense}
          className="mb-4 w-[40%] bg-white p-10"
        >
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="description"
              value={newExpense.description}
              onChange={handleInputChange}
              placeholder="Description"
              required
              className="border p-2 rounded"
            />
            <input
              type="number"
              name="amount"
              value={newExpense.amount}
              onChange={handleInputChange}
              placeholder="Amount"
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="toWhom"
              value={newExpense.toWhom}
              onChange={handleInputChange}
              placeholder="To Whom"
              required
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="receipt"
              value={newExpense.receipt}
              onChange={handleInputChange}
              placeholder="Receipt (optional)"
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="paidBy"
              value={newExpense.paidBy}
              onChange={handleInputChange}
              placeholder="Paid By"
              required
              className="border p-2 rounded"
            />
            <input
              type="date"
              name="date"
              value={newExpense.date}
              onChange={handleInputChange}
              required
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Add Expense
            </button>
          </div>
        </form>
      ) : (
        <div className="p-8 mt-6">
          <h2 className="text-xl font-semibold mb-4">Expenses List</h2>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedExpenses.length === expenses.length &&
                      expenses.length > 0
                    }
                  />
                </th>
                <th className="py-2 px-4 text-left">Description</th>
                <th className="py-2 px-4 text-left">Amount</th>
                <th className="py-2 px-4 text-left">To Whom</th>
                <th className="py-2 px-4 text-left">Receipt</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Paid By</th>
                <th className="py-2 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {currentExpenses.map((expense) => (
                <tr key={expense._id}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      onChange={(e) => handleCheckboxChange(e, expense._id)}
                      checked={selectedExpenses.includes(expense._id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b">{expense.description}</td>
                  <td className="py-2 px-4 border-b">{expense.amount}</td>
                  <td className="py-2 px-4 border-b">{expense.toWhom}</td>
                  <td className="py-2 px-4 border-b">{expense.receipt}</td>
                  <td className="py-2 px-4 border-b">{expense.status}</td>
                  <td className="py-2 px-4 border-b">{expense.paidBy}</td>
                  <td className="py-2 px-4 border-b">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAdding && expenses.length > 0 && (
        <div className="flex justify-center items-center absolute w-[75%] bottom-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`mx-2 py-1 px-4 rounded-lg ${
              currentPage === 1
                ? "cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            &lt;
          </button>
          <span className="mx-2">
            Page {currentPage} of {Math.ceil(expenses.length / itemsPerPage)}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage >= Math.ceil(expenses.length / itemsPerPage)}
            className={`mx-2 py-1 px-4 rounded-lg ${
              currentPage >= Math.ceil(expenses.length / itemsPerPage)
                ? "cursor-not-allowed"
                : "bg-blue-600 text-white"
            }`}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
