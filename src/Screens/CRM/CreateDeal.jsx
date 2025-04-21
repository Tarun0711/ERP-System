import React, { useState } from "react";
import axios from "axios";
import {  toast } from "react-toastify";

const DealForm = () => {
  const [formData, setFormData] = useState({
    taskOwner: "",
    dealName: "",
    accountName: "",
    leadSource: "",
    contactName: "",
    account: "",
    closingDate: "",
    currentStage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://erp-backend-o5i3.onrender.com/api/v1/deals/createDeal", formData);
      
      if (response.status === 200) {
        toast.success("Deal successfully created!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("Error submitting the form!");
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="bg-white overflow-y-scroll h-[90vh] pb-8 w-full rounded-2xl">
      <form
        className="md:flex justify-between w-full h-auto p-8"
        onSubmit={handleSubmit}
      >
        <div className="md:w-[48%]">
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
            <label htmlFor="dealName" className="block mb-1">
              Deal Name
            </label>
            <input
              type="text"
              name="dealName"
              value={formData.dealName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter deal name"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="accountName" className="block mb-1">
              Account Name
            </label>
            <select
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Account</option>
              <option value="Account 1">Account 1</option>
              <option value="Account 2">Account 2</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="leadSource" className="block mb-1">
              Lead Source
            </label>
            <select
              name="leadSource"
              value={formData.leadSource}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Lead Source</option>
              <option value="Google Ads">Google Ads</option>
              <option value="Facebook Ads">Facebook Ads</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="contactName" className="block mb-1">
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter contact name"
            />
          </div>
        </div>
        <div className="md:w-[48%]">
          <div className="mb-4">
            <label htmlFor="account" className="block mb-1">
              Amount
            </label>
            <input
              type="number"
              name="account"
              value={formData.account}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter account"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="closingDate" className="block mb-1">
              Closing Date
            </label>
            <input
              type="date"
              name="closingDate"
              value={formData.closingDate}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="currentStage" className="block mb-1">
              Current Stage
            </label>
            <select
              name="currentStage"
              value={formData.currentStage}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="">Select Stage</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
              <option value="InProgress">In Progress</option>

            </select>
          </div>
        </div>
        
      </form>
      <div className="flex justify-center w-full md:mt-6">
        <button
          type="submit"
          onClick={
            handleSubmit
          }
          className="bg-[#0097AB] w-[150px] h-[40px] rounded-full text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DealForm;
