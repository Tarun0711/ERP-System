import React, { useState } from "react";

// Simulated initial bin data
const initialBinData = [
  { binId: "A1", location: "Section 1", status: "Available", items: [] },
  { binId: "B2", location: "Section 2", status: "Occupied", items: ["Laptop", "Monitor"] },
  { binId: "C3", location: "Section 3", status: "Available", items: [] },
  { binId: "D4", location: "Section 4", status: "Occupied", items: ["Office Chair"] },
];

const ReceivingAndPutaway = () => {
  const [bins, setBins] = useState(initialBinData);
  const [receivedItem, setReceivedItem] = useState({ itemName: "", quantity: 1, selectedBin: "" });
  const [isReceivingModalOpen, setIsReceivingModalOpen] = useState(false);
  const [isPutawayModalOpen, setIsPutawayModalOpen] = useState(false);
  const [putawayItem, setPutawayItem] = useState({ itemName: "", currentBin: "", newBin: "" });

  // Open receiving modal
  const openReceivingModal = () => {
    setIsReceivingModalOpen(true);
  };

  // Close receiving modal
  const closeReceivingModal = () => {
    setIsReceivingModalOpen(false);
    setReceivedItem({ itemName: "", quantity: 1, selectedBin: "" }); // Reset the form
  };

  // Handle input change for received item
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReceivedItem((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle receiving item and assigning to a bin
  const receiveItem = () => {
    if (receivedItem.itemName && receivedItem.selectedBin) {
      const updatedBins = bins.map((bin) => {
        if (bin.binId === receivedItem.selectedBin) {
          return {
            ...bin,
            items: [...bin.items, receivedItem.itemName],
            status: "Occupied", // Change status if items are added
          };
        }
        return bin;
      });
      setBins(updatedBins);
      closeReceivingModal();
    }
  };

  // Open putaway modal
  const openPutawayModal = (item, currentBin) => {
    setPutawayItem({ itemName: item, currentBin: currentBin, newBin: "" });
    setIsPutawayModalOpen(true);
  };

  // Close putaway modal
  const closePutawayModal = () => {
    setIsPutawayModalOpen(false);
    setPutawayItem({ itemName: "", currentBin: "", newBin: "" });
  };

  // Handle putaway process
  const putawayItemToBin = () => {
    if (putawayItem.newBin && putawayItem.currentBin !== putawayItem.newBin) {
      const updatedBins = bins.map((bin) => {
        // Remove item from current bin
        if (bin.binId === putawayItem.currentBin) {
          return {
            ...bin,
            items: bin.items.filter((item) => item !== putawayItem.itemName),
            status: bin.items.length - 1 === 0 ? "Available" : bin.status, // Mark bin as available if empty
          };
        }

        // Add item to new bin
        if (bin.binId === putawayItem.newBin) {
          return {
            ...bin,
            items: [...bin.items, putawayItem.itemName],
            status: "Occupied",
          };
        }

        return bin;
      });
      setBins(updatedBins);
      closePutawayModal();
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold mb-6">Receiving and Putaway</h2>

        {/* Button to open Receiving Modal */}
        <button
          onClick={openReceivingModal}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        >
          Receive Item
        </button>
      </div>

      {/* Bins Overview */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
          <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-2">Bin ID</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Items</th>
              <th className="px-4 py-2">Putaway<span className="text-sm font-thin">{"(click the item for putaway)"}</span></th>
            </tr>
          </thead>
          <tbody>
            {bins.map((bin, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="px-4 text-center py-2">{bin.binId}</td>
                <td className="px-4 text-center py-2">{bin.location}</td>
                <td className="px-4 text-center py-2">{bin.status}</td>
                <td className="px-4 text-center py-2">
                  {bin.items.length > 0 ? bin.items.join(", ") : "No items"}
                </td>
                <td className="px-4 text-center py-2">
                  {bin.items.length > 0 &&
                    bin.items.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => openPutawayModal(item, bin.binId)}
                        className="text-red-700 px-2 py-1 rounded"
                      >
                    {item}
                      </button>
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Receiving Item */}
      {isReceivingModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Receive New Item</h3>
            <input
              type="text"
              name="itemName"
              placeholder="Item Name"
              value={receivedItem.itemName}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            />
            <input
              type="number"
              name="quantity"
              min="1"
              value={receivedItem.quantity}
              onChange={handleInputChange}
              placeholder="Quantity"
              className="border p-2 rounded w-full mb-4"
            />
            <select
              name="selectedBin"
              value={receivedItem.selectedBin}
              onChange={handleInputChange}
              className="border p-2 rounded w-full mb-4"
            >
              <option value="">Select Bin</option>
              {bins.map((bin) => (
                <option key={bin.binId} value={bin.binId}>
                  {bin.binId} - {bin.location}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={receiveItem}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Receive
              </button>
              <button
                onClick={closeReceivingModal}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Putaway */}
      {isPutawayModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Putaway {putawayItem.itemName}</h3>
            <p className="mb-4">Move from Bin {putawayItem.currentBin}</p>
            <select
              name="newBin"
              value={putawayItem.newBin}
              onChange={(e) =>
                setPutawayItem((prev) => ({ ...prev, newBin: e.target.value }))
              }
              className="border p-2 rounded w-full mb-4"
            >
              <option value="">Select New Bin</option>
              {bins
                .filter((bin) => bin.binId !== putawayItem.currentBin)
                .map((bin) => (
                  <option key={bin.binId} value={bin.binId}>
                    {bin.binId} - {bin.location}
                  </option>
                ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={putawayItemToBin}
                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
              >
                Putaway
              </button>
              <button
                onClick={closePutawayModal}
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

export default ReceivingAndPutaway;
