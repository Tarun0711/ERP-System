import React, { useState } from "react";
import axios from "axios";

const TableComponent = ({ columns, data, setData }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  // Toggle selection of individual rows
  const handleSelectRow = (rowId) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return prevSelected.filter((id) => id !== rowId);
      }
      return [...prevSelected, rowId];
    });
  };

  // Select or deselect all rows
  const handleSelectAll = (isChecked) => {
    setSelectedRows(isChecked ? data.map((row) => row._id) : []);
  };

  // Delete selected rows
  const handleDeleteSelected = () => {
    if (selectedRows.length === 0) {
      alert("No rows selected for deletion.");
      return;
    }

    const deleteRequests = selectedRows.map((rowId) => deleteRow(rowId));

    // Wait for all delete requests to finish
    Promise.all(deleteRequests)
      .then(() => {
        console.log("All selected rows deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting rows:", error);
      });
  };

  // Delete row by making a DELETE request
  const deleteRow = (rowId) => {
    return axios
      .delete(`https://erp-backend-o5i3.onrender.com/api/v1/contact/deleteLead/${rowId}`)
      .then((response) => {
        console.log("Delete success:", response.data);
        // Remove the deleted row from the data
        setData((prevData) => prevData.filter((item) => item._id !== rowId));
      })
      .catch((error) => {
        console.error("Error deleting row:", error);
      });
  };

  return (
    <div>
      <table className="min-w-full rounded-2xl bg-white">
        <thead>
          <tr>
            <th className="p-4 text-left">
              <input
                className="h-5 w-5"
                type="checkbox"
                onChange={(e) => handleSelectAll(e.target.checked)}
                checked={selectedRows.length === data.length && data.length > 0}
                aria-label="Select all rows"
              />
            </th>
            {columns.map((col) => (
              <th key={col.accessor} className="p-2 text-left">
                {col.Header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="hover:bg-gray-100">
              <td className="p-4 text-left">
                <input
                  className="h-5 w-5"
                  type="checkbox"
                  checked={selectedRows.includes(row._id)}
                  onChange={() => handleSelectRow(row._id)}
                  aria-label={`Select row ${row._id}`}
                />
              </td>
              {columns.map((col) => (
                <td key={col.accessor} className="p-2 text-left">
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to delete selected rows */}
      <div className="mt-4 mx-auto w-full">
        {/* <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white px-4 mx-auto py-2 rounded-lg hover:bg-red-700"
        >
          Delete Selected
        </button> */}
      </div>
    </div>
  );
};

export default TableComponent;
