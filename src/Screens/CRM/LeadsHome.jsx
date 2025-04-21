import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../Components/TableComponentWithCheckBox";
import axios from "axios";

const columns = [
  { Header: "Lead Name", accessor: "assignedTo" },
  { Header: "Company", accessor: "name" },
  { Header: "Email", accessor: "email" },
  { Header: "Phone Number", accessor: "phone" },
  { Header: "Lead Status", accessor: "status" },
];

function LeadsHome() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const handleImportClick = () => {
    navigate("add-leads");
  };

  // Helper function to convert JSON data to CSV format
  const exportToCSV = () => {
    const headers = columns.map(col => col.Header).join(",");
    const rows = data.map(row =>
      columns.map(col => row[col.accessor] || "").join(",")
    );

    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "leads_export.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    axios.get('https://erp-backend-o5i3.onrender.com/api/v1/contact/getLeads')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className="w-full h-[90vh] pb-8">
      <div className="text-white mb-4 gap-10 font-medium flex justify-end">
        <button
          className="bg-[#0097AB] w-[213px] h-[38px] rounded-full"
          onClick={exportToCSV}
        >
          - Export
        </button>
        <button
          className="bg-[#0097AB] w-[213px] h-[38px] rounded-full"
          onClick={handleImportClick}
        >
          + Import
        </button>
      </div>
      <div className="bg-white h-[80vh] overflow-y-scroll rounded-2xl">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  );
}

export default LeadsHome;
