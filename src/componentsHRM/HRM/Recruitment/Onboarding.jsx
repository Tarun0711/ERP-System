import React, { useState, useEffect } from "react";
import axios from "axios";

function Onboarding() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTask, setNewTask] = useState({
    employeeID: "",
    taskName: "",
    dueDate: "",
    status: "",
  });
  const [error, setError] = useState(null);
  const [isAddingTask, setIsAddingTask] = useState(false); // To toggle between task list and form

  // Fetch existing onboarding tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/recruitment/get-onbaording-task"
        );
        setTasks(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // Fetch employee names
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get(
          "https://erp-backend-o5i3.onrender.com/api/employee/getEmployee"
        );
        setEmployees(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchEmployees();
  }, []);

  // Helper function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    if (typeof string === "string" && string.length > 0) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/recruitment/create-onbaording-task",
        newTask
      );
      setTasks([...tasks, response.data]); // Add the new task to the list
      setNewTask({
        employeeID: "",
        taskName: "",
        dueDate: "",
        status: "pending",
      }); // Reset form
      setIsAddingTask(false); // Switch back to task list after adding
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle task deletion
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://erp-backend-o5i3.onrender.com/api/recruitment/delete-onbaording-task/${id}`
      );
      setTasks(tasks.filter((task) => task._id !== id)); // Remove task from the list
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Onboarding Tasks</h1>
        {/* Add New Task Button */}
        <button
          onClick={() => setIsAddingTask(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Add New Task
        </button>
      </div>

      {/* Conditional rendering: show form or tasks */}
      {isAddingTask ? (
        // Task creation form
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-xl mb-4 text-center font-bold">Add New Task</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex w-full gap-5">
              <div className="flex flex-col w-full">
                <label>Employee</label>
                <select
                  value={newTask.employeeID}
                  onChange={(e) =>
                    setNewTask({ ...newTask, employeeID: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                >
                  <option value="">Select Employee</option>
                  {employees.map((employee) => (
                    <option key={employee._id} value={employee._id}>
                      {capitalizeFirstLetter(employee.firstName)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full">
                <label>Task Name</label>
                <input
                  type="text"
                  placeholder="Task Name"
                  value={newTask.taskName}
                  onChange={(e) =>
                    setNewTask({ ...newTask, taskName: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
            </div>

            <div className="flex w-full gap-5">
              <div className="flex flex-col w-full">
                <label>Due Date</label>
                <input
                  type="date"
                  placeholder="Due Date"
                  value={newTask.dueDate}
                  onChange={(e) =>
                    setNewTask({ ...newTask, dueDate: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label>Status</label>
                <select
                  value={newTask.status}
                  onChange={(e) =>
                    setNewTask({ ...newTask, status: e.target.value })
                  }
                  className="border p-2 rounded w-full"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Save Task
              </button>
              {/* Cancel Button */}
              <button
                onClick={() => setIsAddingTask(false)}
                type="button"
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        // Table to display onboarding tasks
        <table className="min-w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 ">Employee ID</th>
              <th className="px-4 py-2 border border-gray-300 ">Task Name</th>
              <th className="px-4 py-2 border border-gray-300 ">Status</th>
              <th className="px-4 py-2 border border-gray-300 ">Due Date</th>
              <th className="px-4 py-2 border border-gray-300 ">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id}>
                  <td className="px-4 py-2 border text-center">
                    {task.employeeID && task.employeeID
                      ? capitalizeFirstLetter(task.employeeID.employeeID)
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {capitalizeFirstLetter(task.taskName)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {capitalizeFirstLetter(task.status)}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    {new Date(task.dueDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No onboarding tasks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Onboarding;
