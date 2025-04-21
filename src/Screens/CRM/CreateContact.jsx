import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddContact() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    message: "",
    assignedTo: "",
    status: "New",
    value: 0,
    notes: {
      note: "",
      date: new Date(),
    },
    address: {
      name: "",
      street: "",
      landmark: "",
      pincode: "",
      country: "",
      state: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [field]: value,
        },
      }));
    } else if (name.startsWith("notes.note")) {
      setFormData((prevData) => ({
        ...prevData,
        notes: {
          ...prevData.notes,
          note: value,
          date: new Date(),
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };


  const validateForm = () => {
    const { name, email, phone, } = formData;
    if (!name || !email || !phone) {
      toast.error("Please fill in all required fields (Name, Email, and Phone).");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    const url = "https://erp-backend-o5i3.onrender.com/api/v1/contact/createContact";
    try {
      await axios.post(url, formData);
      toast.success("Contact created successfully!");
      setFormData(initialFormData); 
    } catch (error) {
      toast.error("Error creating Contact. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="bg-white h-[90vh] overflow-y-scroll pb-8 w-full rounded-2xl">
      <form onSubmit={handleSubmit} className="p-6 max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Contact Information</h2>
          </div>

          {/* Name */}
          <div>
            <label className="block mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter email"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1">Phone No</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Description */}
          <div className="md:col-span-3">
            <label className="block mb-1">Description</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            />
          </div>

          {/* Assigned To */}
          <div>
            <label className="block mb-1">Assigned To</label>
            <input
              type="text"
              name="assignedTo"
              value={formData.assignedTo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter assigned user ID"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          {/* Value */}
          <div>
            <label className="block mb-1">Value</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter value"
            />
          </div>

          {/* Notes */}
          <div className="md:col-span-3">
            <label className="block mb-1">Notes</label>
            <textarea
              name="notes.note"
              value={formData.notes.note}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Add notes"
            />
          </div>
        </div>

        {/* Address */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Address Fields */}
            {["name", "street", "landmark", "pincode"].map((field) => (
              <div key={field}>
                <label className="block mb-1 capitalize">{field}</label>
                <input
                  type="text"
                  name={`address.${field}`}
                  value={formData.address[field]}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                  placeholder={`Enter ${field}`}
                />
              </div>
            ))}

            {/* Country */}
            <div>
              <label className="block mb-1">Country</label>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Country</option>
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="Canada">Canada</option>
              </select>
            </div>

            {/* State */}
            <div>
              <label className="block mb-1">State</label>
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter state"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-[#0097AB] rounded-full text-white py-1 px-6 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "+ Create Contact"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContact;
