import React, { useState, useEffect } from "react";
import axios from "axios";

const GoalSetting = () => {
  const [goals, setGoals] = useState([
    { title: "", description: "", startDate: "", dueDate: "", progress: 0 },
  ]);
  const [performanceReviews, setPerformanceReviews] = useState([
    { reviewer: "", review: "", rating: 1 },
  ]);
  const [feedback, setFeedback] = useState([{ provider: "", feedback: "" }]);
  const [performanceData, setPerformanceData] = useState([]); // Handle an array of performances
  const [isAddingPerformance, setIsAddingPerformance] = useState(false); // Toggle form vs table
  const [employees, setEmployees] = useState([]); // Store employees list
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(""); // Store selected employee ID

  // Fetch employee names on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/employee/getEmployee"
        );
        setEmployees(response.data); // Set employees list
      } catch (err) {
        console.error("Error fetching employees:", err.message);
      }
    };
    fetchEmployees();
  }, []);

  // Fetch all performance data on component mount
  useEffect(() => {
    axios
      .get(`https://erp-backend-o5i3.onrender.com/api/performance-onboarding/get-performance`)
      .then((response) => {
        setPerformanceData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching performance data:", error);
      });
  }, []);

  const handleCreateOrUpdatePerformance = () => {
    axios
      .post(
        "https://erp-backend-o5i3.onrender.com/api/performance-onboarding/create-update-performance",
        {
          employeeId: selectedEmployeeId, // Include employee ID
          goals,
          performanceReviews,
          feedback,
        }
      )
      .then((response) => {
        console.log("Performance data saved:", response.data);
        setPerformanceData([...performanceData, response.data]); // Add new performance data
        setIsAddingPerformance(false); // Toggle back to the table
      })
      .catch((error) => {
        console.error("Error saving performance data:", error);
      });
  };

  const handleInputChange = (e, index, field, setter, state) => {
    const updatedState = [...state];
    updatedState[index][field] = e.target.value;
    setter(updatedState);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Performance Management</h2>
        <button
          onClick={() => setIsAddingPerformance(!isAddingPerformance)}
          className="bg-blue-500 text-white px-4 py-2 rounded shadow"
        >
          {isAddingPerformance ? "View Performance" : "Add Performance"}
        </button>
      </div>

      {isAddingPerformance ? (
        <div>
          {/* Employee Dropdown */}
          <div className="mb-6 w-full">
            <label className="block text-lg font-semibold mb-2">
              Select Employee
            </label>
            <select
              className="border p-2 rounded w-full"
              value={selectedEmployeeId}
              onChange={(e) => setSelectedEmployeeId(e.target.value)}
            >
              <option value="">Select an employee</option>
              {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                  {employee.firstName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row gap-5 w-full">
            <div className="mb-6 w-full">
              <h4 className="text-lg font-semibold text-center">Goals</h4>
              {goals.map((goal, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  <div className="flex flex-col">
                    <label>Goal Title</label>
                    <input
                      type="text"
                      placeholder="Goal Title"
                      className="border p-2 rounded"
                      value={goal.title}
                      onChange={(e) =>
                        handleInputChange(e, index, "title", setGoals, goals)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Description</label>
                    <input
                      type="text"
                      placeholder="Description"
                      className="border p-2 rounded"
                      value={goal.description}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "description",
                          setGoals,
                          goals
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Starting Date</label>
                    <input
                      type="date"
                      className="border p-2 rounded"
                      value={goal.startDate}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "startDate",
                          setGoals,
                          goals
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Last Date</label>
                    <input
                      type="date"
                      className="border p-2 rounded"
                      value={goal.dueDate}
                      onChange={(e) =>
                        handleInputChange(e, index, "dueDate", setGoals, goals)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Number to assign</label>
                    <input
                      type="number"
                      placeholder="Progress"
                      className="border p-2 rounded"
                      value={goal.progress}
                      onChange={(e) =>
                        handleInputChange(e, index, "progress", setGoals, goals)
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6 w-full">
              <h4 className="text-lg font-semibold text-center">
                Performance Reviews
              </h4>
              {performanceReviews.map((review, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  <div className="flex flex-col">
                    <label>Reviewer ID</label>
                    <input
                      type="text"
                      placeholder="Reviewer ID"
                      className="border p-2 rounded"
                      value={review.reviewer}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "reviewer",
                          setPerformanceReviews,
                          performanceReviews
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Review</label>
                    <input
                      type="text"
                      placeholder="Review"
                      className="border p-2 rounded"
                      value={review.review}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "review",
                          setPerformanceReviews,
                          performanceReviews
                        )
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Rating</label>
                    <input
                      type="number"
                      placeholder="Rating (1-5)"
                      className="border p-2 rounded"
                      value={review.rating}
                      min="1"
                      max="5"
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "rating",
                          setPerformanceReviews,
                          performanceReviews
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6 w-full">
              <h4 className="text-lg font-semibold text-center">Feedback</h4>
              {feedback.map((fb, index) => (
                <div key={index} className="flex flex-col gap-2 mb-4">
                  <div className="flex flex-col">
                    <label>Provider ID</label>
                    <input
                      type="text"
                      placeholder="Provider ID"
                      className="border p-2 rounded"
                      value={fb.provider}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "provider",
                          setFeedback,
                          feedback
                        )
                      }
                    />
                  </div>

                  <div className="flex flex-col">
                    <label>Feedback</label>
                    <input
                      type="text"
                      placeholder="Feedback"
                      className="border p-2 rounded"
                      value={fb.feedback}
                      onChange={(e) =>
                        handleInputChange(
                          e,
                          index,
                          "feedback",
                          setFeedback,
                          feedback
                        )
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center items-center w-full">
            <button
              onClick={handleCreateOrUpdatePerformance}
              className="bg-green-500 text-white px-4 py-2 rounded shadow"
            >
              Submit Performance
            </button>
          </div>
        </div>
      ) : (
        <div>
          {performanceData.length > 0 ? (
            <table className="table-auto w-full border-collapse border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2 border-gray-300">
                    Goal Title
                  </th>
                  <th className="border px-4 py-2 border-gray-300">
                    Description
                  </th>
                  <th className="border px-4 py-2 border-gray-300">Progress</th>
                  <th className="border px-4 py-2 border-gray-300">Reviewer</th>
                  <th className="border px-4 py-2 border-gray-300">Review</th>
                  <th className="border px-4 py-2 border-gray-300">Rating</th>
                  <th className="border px-4 py-2 border-gray-300">
                    Feedback Provider
                  </th>
                  <th className="border px-4 py-2 border-gray-300">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((performance, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">
                      {performance.goals[0]?.title || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.goals[0]?.description || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.goals[0]?.progress || 0}%
                    </td>
                    <td className="border px-4 py-2">
                      {performance.performanceReviews[0]?.reviewer || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.performanceReviews[0]?.review || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.performanceReviews[0]?.rating || 0}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.feedback[0]?.provider || ""}
                    </td>
                    <td className="border px-4 py-2">
                      {performance.feedback[0]?.feedback || ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No performance data available</p>
          )}
        </div>
      )}
    </div>
  );
};

export default GoalSetting;
