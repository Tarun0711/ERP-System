import React, { useState } from "react";

// Simulated initial bin data
const initialBinData = [
  { binId: "A1", location: "Section 1", status: "Available", items: [] },
  {
    binId: "B2",
    location: "Section 2",
    status: "Occupied",
    items: ["Laptop", "Monitor"],
  },
  { binId: "C3", location: "Section 3", status: "Available", items: [] },
  {
    binId: "D4",
    location: "Section 4",
    status: "Occupied",
    items: ["Office Chair"],
  },
];

const BinManagement = () => {
  const [bins, setBins] = useState(initialBinData);
  const [newBin, setNewBin] = useState({
    binId: "",
    location: "",
    status: "Available",
    items: [],
  });
  const [selectedBin, setSelectedBin] = useState(null);
  const [itemToAdd, setItemToAdd] = useState("");
  const [filterStatus, setFilterStatus] = useState("All"); // New state for filter
  const [isAddBinModalOpen, setIsAddBinModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);

  // Handle form input changes for bins
  const handleBinInputChange = (e) => {
    const { name, value } = e.target;
    setNewBin((prevBin) => ({
      ...prevBin,
      [name]: value,
    }));
  };

  // Add a new bin
  const addBin = () => {
    if (newBin.binId && newBin.location) {
      setBins([...bins, newBin]);
      setNewBin({ binId: "", location: "", status: "Available", items: [] });
      closeAddBinModal(); // Close the modal after adding
    }
  };

  // Delete a bin
  const deleteBin = (index) => {
    setBins(bins.filter((_, i) => i !== index));
  };

  // Open modal to add item to bin
  const openAddItemModal = (binIndex) => {
    setSelectedBin(binIndex);
    setIsAddItemModalOpen(true);
  };

  // Close item modal
  const closeAddItemModal = () => {
    setIsAddItemModalOpen(false);
    setItemToAdd("");
  };

  // Open modal to add bin
  const openAddBinModal = () => {
    setIsAddBinModalOpen(true);
  };

  // Close add bin modal
  const closeAddBinModal = () => {
    setIsAddBinModalOpen(false);
    setNewBin({ binId: "", location: "", status: "Available", items: [] });
  };

  // Add item to selected bin
  const addItemToBin = () => {
    if (itemToAdd) {
      const updatedBins = bins.map((bin, index) => {
        if (index === selectedBin) {
          return {
            ...bin,
            items: [...bin.items, itemToAdd],
            status: "Occupied", // Change status if items are added
          };
        }
        return bin;
      });
      setBins(updatedBins);
      closeAddItemModal();
    }
  };

  // Delete item from bin
  const deleteItemFromBin = (binIndex, itemIndex) => {
    const updatedBins = bins.map((bin, index) => {
      if (index === binIndex) {
        const updatedItems = bin.items.filter((_, i) => i !== itemIndex);
        return {
          ...bin,
          items: updatedItems,
          status: updatedItems.length === 0 ? "Available" : "Occupied",
        };
      }
      return bin;
    });
    setBins(updatedBins);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  // Filter bins based on status
  const filteredBins = bins.filter((bin) => {
    if (filterStatus === "All") return true;
    return bin.status === filterStatus;
  });

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Bin Management</h2>
      <div className="flex items-center justify-between">
        {/* Filter Selection */}
        <div className="mb-4">
          <label className="mr-2">Filter by Status:</label>
          <select
            value={filterStatus}
            onChange={handleFilterChange}
            className="border p-2 rounded"
          >
            <option value="All">All</option>
            <option value="Available">Available</option>
            <option value="Occupied">Occupied</option>
          </select>
        </div>

        {/* Button to open Add Bin Modal */}
        <button
          onClick={openAddBinModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          + Add Bin
        </button>
      </div>

      {/* Bin Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-2">Bin ID</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBins.map((bin, binIndex) => (
              <tr
                key={binIndex}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="px-4 text-center py-2">{bin.binId}</td>
                <td className="px-4 text-center py-2">{bin.location}</td>
                <td className="px-4 text-center py-2">{bin.status}</td>
                <td className="px-4 text-center py-2">
                  {bin.items.length > 0 ? (
                    <ul className="flex gap-1 items-center justify-center flex-wrap">
                      {bin.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="flex bg-blue-200 rounded-xl relative w-fit px-2 p-1 border-blue-500 border-[0.5px] justify-between items-center"
                        >
                          {item}
                          <button
                            onClick={() =>
                              deleteItemFromBin(binIndex, itemIndex)
                            }
                            className="text-red-500 absolute -top-3 right-0 ml-2"
                          >
                            &#10005;
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No items"
                  )}
                </td>
                <td className="px-4 flex items-center justify-center py-2">
                  <button
                    onClick={() => openAddItemModal(binIndex)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Add Item
                  </button>
                  <button
                    onClick={() => deleteBin(binIndex)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete Bin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Adding Bin */}
      {isAddBinModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Add New Bin</h3>
            <input
              type="text"
              name="binId"
              placeholder="Bin ID"
              value={newBin.binId}
              onChange={handleBinInputChange}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={newBin.location}
              onChange={handleBinInputChange}
              className="border p-2 rounded w-full mb-4"
            />
            <select
              name="status"
              value={newBin.status}
              onChange={handleBinInputChange}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={addBin}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Add Bin
              </button>
              <button
                onClick={closeAddBinModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding Item */}
      {isAddItemModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Add Item to Bin</h3>
            <input
              type="text"
              placeholder="Item Name"
              value={itemToAdd}
              onChange={(e) => setItemToAdd(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end">
              <button
                onClick={addItemToBin}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Add Item
              </button>
              <button
                onClick={closeAddItemModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinManagement;
