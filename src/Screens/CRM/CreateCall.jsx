import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify"; 

const ScheduleCallForm = () => {
  const [callTo, setCallTo] = useState("Contact");
  const [relatedTo, setRelatedTo] = useState("Account");
  const [callType] = useState("Outbound");
  const [callStatus] = useState("Scheduled");
  const [startTime, setStartTime] = useState("2024-09-13T19:00");
  const [callOwner] = useState("rushyendra kankanala");
  const [subject, setSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://erp-backend-o5i3.onrender.com/api/v1/calls/schedule', {
        callTo,
        relatedTo,
        callType,
        callStatus,
        startTime,
        callOwner,
        subject,
      });
      setCallTo("Contact");
    setRelatedTo("Account");
    setStartTime("");
    setSubject("");
      toast.success(response.data.message); 
    } catch (error) {
      toast.error(error.response.data.message || 'Error scheduling call'); 
    }
  };
  return (
    <div className="w-full mx-auto overflow-y-scroll pb-8 bg-white h-[90vh] p-6 shadow-lg rounded-2xl">
      <h2 className="text-2xl font-semibold mb-4">Schedule a Call</h2>
      <form className="max-w-lg mx-auto " onSubmit={handleSubmit}>
        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Call To</label>
          <select
            value={callTo}
            onChange={(e) => setCallTo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Contact</option>
            <option>Lead</option>
            <option>Customer</option>
          </select>
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Related To</label>
          <select
            value={relatedTo}
            onChange={(e) => setRelatedTo(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Account</option>
            <option>Project</option>
            <option>Task</option>
          </select>
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Call Type</label>
          <input
            type="text"
            value={callType}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
          />
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Call Status</label>
          <input
            type="text"
            value={callStatus}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
          />
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Call Start Time</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Call Owner</label>
          <input
            type="text"
            value={callOwner}
            readOnly
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
          />
        </div>

        <div className="items-center mb-4 grid grid-flow-col grid-cols-2 justify-end">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 flex items-center justify-center w-full">
          <button
            type="submit"
            className="w-[190px] bg-[#0097AB] mx-auto text-white py-2 px-4 rounded-full hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ScheduleCallForm;
