import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { CSVLink } from "react-csv";
import axios from "axios";
import { toast } from "react-toastify";
import Papa from "papaparse"; // Import PapaParse

const InventoryItems = () => {
  const [filter, setFilter] = useState("all");
  const [stock, setStock] = useState([]); // Stores all inventory items
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false); // Modal state for import
  const [warehouses, setWarehouses] = useState([]); // Stores fetched warehouses
  const [bins, setBins] = useState([]); // Stores bins within the selected warehouse
  const [sections, setSections] = useState([]); // Stores sections within the selected bin
  const [newItem, setNewItem] = useState({
    warehouseId: "",
    binId: "",
    sectionId: "",
    itemName: "",
    sku: "",
    category: "",
    stockLevel: "",
  });
  const [file, setFile] = useState(null); // Store the uploaded file

  // Fetch stock items from the backend on component mount
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await axios.get("https://erp-backend-o5i3.onrender.com/api/v1/items/items");
        setStock(response.data);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    const fetchWarehouses = async () => {
      try {
        const response = await axios.get("https://erp-backend-o5i3.onrender.com/api/v1/warehouses/warehouses");
        setWarehouses(response.data); // Set warehouses data
      } catch (error) {
        console.error("Error fetching warehouses:", error);
      }
    };

    fetchStock();
    fetchWarehouses();
  }, []);

  // Handle file selection for import
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Handle importing the CSV file
  const handleImport = () => {
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: async (results) => {
          try {
            const parsedData = results.data;
            // Send parsed CSV data to backend API
            await axios.post("https://erp-backend-o5i3.onrender.com/api/v1/items/import", parsedData);
            toast.success("Items imported successfully");
            setImportModalOpen(false);
            // Refresh inventory items after import
            const response = await axios.get("https://erp-backend-o5i3.onrender.com/api/v1/items/items");
            setStock(response.data);
          } catch (error) {
            console.error("Error importing data:", error);
            toast.error("Error importing data");
          }
        },
      });
    } else {
      toast.error("Please select a file to import");
    }
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Handle input changes for the new item form
  const handleNewItemChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });

    // Fetch bins when a warehouse is selected
    if (e.target.name === "warehouseId") {
      const selectedWarehouse = warehouses.find((w) => w._id === e.target.value);
      setBins(selectedWarehouse?.bins || []);
      setSections([]); // Reset sections when warehouse changes
    }

    // Fetch sections when a bin is selected
    if (e.target.name === "binId") {
      const selectedBin = bins.find((b) => b._id === e.target.value);
      setSections(selectedBin?.sections || []);
    }
  };

  // Handle adding a new item to the inventory
  const handleAddItem = async () => {
    try {
      const response = await axios.post("https://erp-backend-o5i3.onrender.com/api/v1/items/items", {
        warehouseId: newItem.warehouseId,
        binId: newItem.binId,
        sectionId: newItem.sectionId,
        itemName: newItem.itemName,
        itemSKU: newItem.sku,
        itemCategory: newItem.category,
        stocksLevel: newItem.stockLevel,
      });
      setStock([...stock, response.data]);
      setModalIsOpen(false);
      setNewItem({ warehouseId: "", binId: "", sectionId: "", itemName: "", sku: "", category: "", stockLevel: "" });
    } catch (error) {
      console.error("Error adding new item:", error);
      toast.error("Error adding item");
    }
  };

  return (
    <div className="w-full px-4">
      {/* Modal for adding new item */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        ariaHideApp={false}
      >
        {/* Add Item Form */}
        {/* ... your add item modal code ... */}
      </Modal>

      {/* Modal for importing items */}
      <Modal
        isOpen={importModalOpen}
        onRequestClose={() => setImportModalOpen(false)}
        className="flex justify-center items-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        ariaHideApp={false}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
          <h2 className="text-xl mb-4">Import Items</h2>
          <form className="flex flex-col gap-4">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="border p-2 rounded-lg"
            />
            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setImportModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={handleImport}
              >
                Import
              </button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Header with Filter and Buttons */}
      <header className="h-16 border-b-[0.5px] shadow-sm flex items-center justify-between px-8">
        <select
          className="border-blue-500 text-xl border-[0.5px] rounded-2xl p-3"
          value={filter}
          onChange={handleFilterChange}
        >
          <option className="text-sm" value="all">All Items</option>
          <option className="text-sm" value="active">Active Items</option>
          <option className="text-sm" value="inactive">Inactive Items</option>
        </select>
        <div className="flex items-center gap-4">
          <button
            className="bg-blue-600 p-1 text-white px-2 rounded-lg"
            onClick={() => setModalIsOpen(true)}
          >
            + New
          </button>
          <button
            className="bg-blue-600 p-1 text-white px-2 rounded-lg"
            onClick={() => setImportModalOpen(true)}
          >
            + Import
          </button>
          <CSVLink
            data={stock}
            filename={"stock_data.csv"}
            className="bg-blue-600 p-1 text-white px-2 rounded-lg"
          >
            - Export
          </CSVLink>
        </div>
      </header>

      {/* Inventory Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-sm text-gray-700">
              <th className="px-4 py-2">SKU</th>
              <th className="px-4 py-2">Item Name</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Stock Level</th>
              <th className="px-4 py-2">Section</th>
     
            </tr>
          </thead>
          <tbody>
            {stock.map((item) => (
              <tr key={item._id} className="text-sm text-gray-700">
                 <td className="border text-center px-4 py-2">{item.sku}</td>
                <td className="border text-center px-4 py-2">{item.name}</td>
                <td className="border text-center px-4 py-2">{item.category}</td>
                <td className="border text-center px-4 py-2">{item.stock}</td>
                <td className="border text-center px-4 py-2">{item.location.name}</td>
   
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryItems;
