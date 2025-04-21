import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { toast } from 'react-toastify';

const MeetingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    allDay: false,
    fromDate: '2024-09-13',
    fromTime: '19:00',
    toDate: '2024-09-13',
    toTime: '20:00',
    host: 'rushyendra kankanala',
    participants: [],
    relatedTo: 'None',
  });
  const [showAddParticipantInput, setShowAddParticipantInput] = useState(false);
  const [newParticipant, setNewParticipant] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleAddParticipant = () => {
    if (newParticipant.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        participants: [...prevData.participants, newParticipant.trim()],
      }));
      setNewParticipant('');
      setShowAddParticipantInput(false); 
    }
  };

  const handleToggleAddParticipantInput = () => {
    setShowAddParticipantInput(!showAddParticipantInput);
  };

  const handleRemoveParticipant = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      participants: prevData.participants.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted: ', formData);

    try {
      const response = await axios.post('https://erp-backend-o5i3.onrender.com/api/v1/meetings/create', formData);
      console.log('Data uploaded successfully:', response.data);
      toast.success("Meeting created successfully!", { position: "top-right" });

      setFormData({
        title: '',
        location: '',
        allDay: false,
        fromDate: '2024-09-13',
        fromTime: '19:00',
        toDate: '2024-09-13',
        toTime: '20:00',
        host: 'rushyendra kankanala',
        participants: [],
        relatedTo: 'None',
      });
    } catch (error) {
      console.error('Error uploading data:', error);
      toast.error("Failed to create Meeting. Please try again.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="bg-white px-8 py-4 h-[90vh] overflow-y-scroll w-full rounded-2xl">
      <form onSubmit={handleSubmit} className="max-w-xl p-6 rounded-lg bg-white">
        <h2 className="text-lg font-bold mb-6">Meeting Information</h2>

        <div className="mb-2 border-b">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Meeting Title"
            className="w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-2 border-b ">
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Location"
            className="w-full p-2 rounded-md"
          />
        </div>

        <div className="mb-2 border-b flex gap-8 items-center">
          <label className="mr-2 border-b border-red-500">All day</label>
          <input
            type="checkbox"
            name="allDay"
            checked={formData.allDay}
            onChange={handleChange}
            className="mr-2 h-5 w-8"
          />
        </div>

        <div className="mb-2 flex items-center gap-8 border-b justify-between">
          <label className="block border-b border-red-500">From</label>
          <div className="flex space-x-4">
            <input
              type="date"
              name="fromDate"
              value={formData.fromDate}
              onChange={handleChange}
              className="w-2/3 p-2 rounded-md"
            />
            {!formData.allDay && (
              <input
                type="time"
                name="fromTime"
                value={formData.fromTime}
                onChange={handleChange}
                className="w-1/3 p-2 rounded-md"
              />
            )}
          </div>
        </div>

        <div className="mb-2 flex items-center gap-8 border-b justify-between">
          <label className="block border-b border-red-500">To</label>
          <div className="flex space-x-4">
            <input
              type="date"
              name="toDate"
              value={formData.toDate}
              onChange={handleChange}
              className="w-2/3 p-2 rounded-md"
            />
            {!formData.allDay && (
              <input
                type="time"
                name="toTime"
                value={formData.toTime}
                onChange={handleChange}
                className="w-1/3 p-2 rounded-md"
              />
            )}
          </div>
        </div>

        <div className="mb-2 flex items-center gap-8 border-b justify-between">
          <label className="block border-b border-red-500">Host</label>
          <select
            name="host"
            value={formData.host}
            onChange={handleChange}
            className="w-2/3 p-2 rounded-md"
          >
            <option value="rushyendra kankanala">rushyendra kankanala</option>
          </select>
        </div>

        <div className="mb-2 flex items-center gap-8 border-b justify-between">
          <label className="block border-b border-red-500">Participants</label>
          <ul className="list-none flex items-center gap-3 space-y-2">
            {formData.participants.length > 0 ? (
              formData.participants.map((participant, index) => (
                <li key={index} className="flex relative z-50 items-center justify-between">
                  {participant}
                  <button
                    type="button"
                    onClick={() => handleRemoveParticipant(index)}
                    className="bg-red-500 bg-opacity-60 z-0 -right-2 -top-1 absolute rounded-full h-4 w-4 text-white flex items-center justify-center text-xs"
                  >
                    X
                  </button>
                </li>
              ))
            ) : (
              <p>None</p>
            )}
          </ul>
          {showAddParticipantInput ? (
            <div className="mb-2 flex items-center gap-3 ">
              <input
                type="text"
                value={newParticipant}
                onChange={(e) => setNewParticipant(e.target.value)}
                placeholder="Add participant"
                className="w-full p-2 rounded-md"
              />
              <button
                type="button"
                onClick={handleAddParticipant}
                className="text-blue-700 w-24 p-2 rounded-md"
              >
                + Add
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleToggleAddParticipantInput}
              className="text-blue-700 w-64 p-2 rounded-md"
            >
              + Add Participant
            </button>
          )}
        </div>

        <div className="mb-2 flex items-center gap-3 border-b justify-between">
          <label className="block border-b border-red-500 ">Related To</label>
          <select
            name="relatedTo"
            value={formData.relatedTo}
            onChange={handleChange}
            className="w-2/3 p-2 rounded-md"
          >
            <option value="None">None</option>
          </select>
        </div>

        <div className='w-full justify-center flex '>
          <button
            type="submit"
            className="w-[190px] mx-auto p-3 bg-[#0097AB] rounded-full text-white hover:bg-teal-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingForm;
