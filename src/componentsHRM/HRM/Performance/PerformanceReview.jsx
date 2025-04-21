import React, { useState, useEffect } from "react";
import axios from "axios";

function PerformanceReview() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    reviewer: "",
    review: "",
    rating: 1,
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await axios.get(
        "https://erp-backend-o5i3.onrender.com/api/employee/getEmployee"
      );
      setEmployees(response.data);
    };
    fetchEmployees();
  }, []);

  const handleEmployeeSelect = async (employeeId) => {
    setSelectedEmployee(employeeId);
    const response = await axios.get(
      `https://erp-backend-o5i3.onrender.com/api/performance-onboarding/get-performance/${employeeId}`
    );
    setReviews(response.data.performanceReviews || []);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const updatedReviews = [...reviews, newReview];
    try {
      const response = await axios.post(
        `https://erp-backend-o5i3.onrender.com/api/performance-onboarding/create-update-performance`,
        {
          employee: selectedEmployee,
          performanceReviews: updatedReviews,
        }
      );
      setReviews(response.data.performanceReviews);
      setNewReview({
        reviewer: "",
        review: "",
        rating: 1,
      });
    } catch (error) {
      console.error("Error submitting review", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Performance Review</h1>

      <select
        className="block w-full p-2 mb-4 border border-gray-300 rounded-md"
        onChange={(e) => handleEmployeeSelect(e.target.value)}
        value={selectedEmployee}
      >
        <option value="">Select Employee</option>
        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.firstName} {emp.lastName}
          </option>
        ))}
      </select>

      <form onSubmit={handleReviewSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Reviewer Name"
          value={newReview.reviewer}
          onChange={(e) =>
            setNewReview({ ...newReview, reviewer: e.target.value })
          }
          className="block w-full p-2 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Review"
          value={newReview.review}
          onChange={(e) =>
            setNewReview({ ...newReview, review: e.target.value })
          }
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
        <input
          type="number"
          min="1"
          max="5"
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: e.target.value })
          }
          className="block w-full p-2 border border-gray-300 rounded-md"
        />
        <button className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">
          Add Review
        </button>
      </form>

      <div className="mt-6 space-y-4">
        {reviews.map((review, index) => (
          <div key={index} className="border p-4 rounded-md shadow-md">
            <h3 className="font-bold text-xl">Reviewer: {review.reviewer}</h3>
            <p>{review.review}</p>
            <p className="text-gray-600">Rating: {review.rating}/5</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PerformanceReview;
