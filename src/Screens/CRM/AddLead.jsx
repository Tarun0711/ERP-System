import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function AddLead() {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    description: "",
    assignedTo: "",
    status: "New",
    value: 0,
    notes: [
      {
        note: "",
        date: new Date(),
      },
    ],
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

    if (name === "notes") {
      setFormData((prevData) => ({
        ...prevData,
        notes: [{ note: value, date: new Date() }],
      }));
    } else if (name.startsWith("address.")) {
      const field = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        address: {
          ...prevData.address,
          [field]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const url = "https://erp-backend-o5i3.onrender.com/api/v1/contact/createLead";
    const leadData = {
      ...formData,
      notes: [{ note: formData.notes[0].note, date: new Date() }],
    };

    try {
      await axios.post(url, leadData);
      toast.success("Lead created successfully!");
      setFormData(initialFormData);
    } catch (error) {
      toast.error("Error creating lead. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white h-[90vh] overflow-y-scroll w-full rounded-2xl">
      <form onSubmit={handleSubmit} className="p-6 max-w-full mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <div className="md:col-span-3">
            <h2 className="text-lg font-semibold mb-4">Lead Information</h2>
          </div>

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

          <div>
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter description"
            />
          </div>

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

          <div>
            <label className="block mb-1">Value</label>
            <input
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter value"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes[0].note}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Add notes"
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-4">Address Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-1">Address Name</label>
              <input
                type="text"
                name="address.name"
                value={formData.address.name}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter address name"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Street / Colony / Town</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter street"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Landmark</label>
              <input
                type="text"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter landmark"
              />
            </div>

            <div>
              <label className="block mb-1">Pin code</label>
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                placeholder="Enter pin code"
                required
              />
            </div>

            <div>
              <label className="block mb-1">Country</label>
              <select
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option>Select country</option>
                <option>USA</option>
                <option>India</option>
                <option>Canada</option>
              </select>
            </div>

            <div>
              <label className="block mb-1">State</label>
              <select
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              >
                <option>Select State</option>
                <option>California</option>
                <option>Delhi</option>
                <option>Ontario</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            className="bg-[#0097AB] rounded-full text-white py-1 px-6 flex items-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : <><span className="mr-2">+</span> Create Lead</>}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddLead;
