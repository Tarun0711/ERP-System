import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const TaskForm = () => {
  const [formData, setFormData] = useState({
    taskOwner: "",
    subject: "",
    dueDate: "",
    contact: "",
    account: "",
    status: "",
    priority: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/v1/contact/createTask",
        formData
      );
      toast.success("Task created successfully!", { position: "top-right" });
      console.log("Response:", response.data);

      setFormData({
        taskOwner: "",
        subject: "",
        dueDate: "",
        contact: "",
        account: "",
        status: "",
        priority: "",
      });
    } catch (error) {
      toast.error("Failed to create task. Please try again.", {
        position: "top-right",
      });
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="bg-white h-[90vh] w-full rounded-2xl p-8">
      
      <form
        className="flex flex-col items-center w-full bg-white rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="text-black font-medium text-lg mb-6">Task Information</div>

        <div className="flex justify-between w-full mb-4">
          <div className="w-[48%]">
            <div className="mb-4">
              <label htmlFor="taskOwner" className="block mb-1">
                Task Owner
              </label>
              <select
                name="taskOwner"
                value={formData.taskOwner}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Task Owner</option>
                <option value="Owner 1">Owner 1</option>
                <option value="Owner 2">Owner 2</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="subject" className="block mb-1">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter subject"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="dueDate" className="block mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contact" className="block mb-1">
                Contact
              </label>
              <input
                type="text"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter contact"
              />
            </div>
          </div>

          <div className="w-[48%]">
            <div className="mb-4">
              <label htmlFor="account" className="block mb-1">
                Account
              </label>
              <input
                type="text"
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter account"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="status" className="block mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Status</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="In Progress">In Progress</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="priority" className="block mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Priority</option>
                <option value="Highest">Highest</option>
                <option value="High">High</option>
                <option value="Normal">Normal</option>
                <option value="Low">Low</option>
                <option value="Lowest">Lowest</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#0097AB] w-[150px] h-[40px] rounded-full text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
