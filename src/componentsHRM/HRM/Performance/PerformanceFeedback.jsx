import React, { useState, useEffect } from "react";
import axios from "axios";

function PerformanceFeedback() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [newFeedback, setNewFeedback] = useState({
    provider: "",
    feedback: "",
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get("https://erp-backend-o5i3.onrender.com/api/employee/getEmployee");
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = async (employeeId) => {
    setSelectedEmployee(employeeId);
    const response = await axios.get(`https://erp-backend-o5i3.onrender.com/api/performance/${employeeId}`);
    setFeedback(response.data.feedback || []);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const updatedFeedback = [...feedback, newFeedback];
    try {
      const response = await axios.post(`https://erp-backend-o5i3.onrender.com/api/performance`, {
        employee: selectedEmployee,
        feedback: updatedFeedback,
      });
      setFeedback(response.data.feedback);
      setNewFeedback({
        provider: "",
        feedback: "",
      });
    } catch (error) {
      console.error("Error submitting feedback", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Performance Feedback</h1>

      <div className="mb-4">
        <label htmlFor="employeeSelect" className="block text-sm font-medium text-gray-700 mb-2">
          Select Employee
        </label>
        <select
          id="employeeSelect"
          onChange={(e) => handleEmployeeSelect(e.target.value)}
          value={selectedEmployee}
          className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp._id}>
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleFeedbackSubmit} className="bg-white p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Submit Feedback</h2>
        <input
          type="text"
          placeholder="Feedback Provider"
          value={newFeedback.provider}
          onChange={(e) => setNewFeedback({ ...newFeedback, provider: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <textarea
          placeholder="Feedback"
          value={newFeedback.feedback}
          onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
        >
          Submit Feedback
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold mb-4">Feedback History</h2>
        <ul className="space-y-4">
          {feedback.map((item, index) => (
            <li key={index} className="p-4 bg-white border border-gray-200 rounded-md shadow-md">
              <h3 className="font-semibold">Provider: {item.provider}</h3>
              <p className="text-gray-700">{item.feedback}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PerformanceFeedback;
