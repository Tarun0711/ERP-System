import React, { useState, useEffect } from "react";
import axios from "axios";
import Papa from "papaparse";

function FinancialReporting() {
  const [reports, setReports] = useState([]);
  const [selectedReports, setSelectedReports] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reportsPerPage = 5; // Set the number of reports to display per page
  const [newReport, setNewReport] = useState({
    type: "income_statement",
    periodStart: "",
    periodEnd: "",
    reportData: [{ key: "", value: 0 }],
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await axios.get(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/financial-reports"
      );
      setReports(response.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  const handleReportDataChange = (e, index) => {
    const { name, value } = e.target;
    const updatedData = [...newReport.reportData];
    updatedData[index][name] = name === "value" ? Number(value) : value;
    setNewReport({ ...newReport, reportData: updatedData });
  };

  const handleAddReportData = () => {
    setNewReport({
      ...newReport,
      reportData: [...newReport.reportData, { key: "", value: 0 }],
    });
  };

  const handleRemoveReportData = (index) => {
    const updatedData = newReport.reportData.filter((_, i) => i !== index);
    setNewReport({ ...newReport, reportData: updatedData });
  };

  const handleAddReport = async (e) => {
    e.preventDefault();
    try {
      const formattedReportData = newReport.reportData.reduce((obj, item) => {
        obj[item.key] = item.value;
        return obj;
      }, {});
      await axios.post(
        "https://erp-backend-o5i3.onrender.com/api/account-fianance/financial-reports",
        {
          ...newReport,
          reportData: formattedReportData,
        }
      );
      fetchReports(); // Refresh report list
      setIsAdding(false);
      setNewReport({
        type: "income_statement",
        periodStart: "",
        periodEnd: "",
        reportData: [{ key: "", value: 0 }],
      });
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };

  // Handle individual checkbox selection
  const handleCheckboxChange = (e, reportId) => {
    if (e.target.checked) {
      setSelectedReports([...selectedReports, reportId]);
    } else {
      setSelectedReports(selectedReports.filter((id) => id !== reportId));
    }
  };

  // Handle "Select All" checkbox
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allReportIds = reports.map((report) => report._id);
      setSelectedReports(allReportIds);
    } else {
      setSelectedReports([]);
    }
  };

  // Export selected reports to CSV
  const exportToCSV = () => {
    if (selectedReports.length === 0) {
      alert("No reports selected for export.");
      return;
    }

    const selectedData = reports.filter((report) =>
      selectedReports.includes(report._id)
    );

    const formattedData = selectedData.map((report) => ({
      Type: report.type.replace("_", " "),
      PeriodStart: new Date(report.periodStart).toLocaleDateString(),
      PeriodEnd: new Date(report.periodEnd).toLocaleDateString(),
      CreatedAt: new Date(report.createdAt).toLocaleDateString(),
    }));

    const csv = Papa.unparse(formattedData);

    // Create a link to download the CSV file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "financial_reports.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Pagination logic
  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

  const nextPage = () => {
    if (currentPage < Math.ceil(reports.length / reportsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="text-center w-full justify-between flex">
        <div className="flex justify-between">
          <p className="font-serif font-semibold text-gray-700 text-xl">
            / Financial Reporting
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-center">
            <button
              onClick={() => setIsAdding(!isAdding)}
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              {isAdding ? "Cancel" : "+ New"}
            </button>
            <button
              onClick={exportToCSV}
              className="bg-green-500 text-white py-2 px-4 rounded-lg ml-3 transition duration-300"
            >
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {isAdding && (
        <form
          onSubmit={handleAddReport}
          className="mb-4 w-[50%] bg-white p-6 mt-6"
        >
          <div className="flex flex-col space-y-4">
            <select
              name="type"
              value={newReport.type}
              onChange={handleInputChange}
              required
              className="border p-2 rounded"
            >
              <option value="income_statement">Income Statement</option>
              <option value="balance_sheet">Balance Sheet</option>
              <option value="cash_flow_statement">Cash Flow Statement</option>
            </select>

            <input
              type="date"
              name="periodStart"
              value={newReport.periodStart}
              onChange={handleInputChange}
              required
              className="border p-2 rounded"
            />

            <input
              type="date"
              name="periodEnd"
              value={newReport.periodEnd}
              onChange={handleInputChange}
              required
              className="border p-2 rounded"
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">Report Data</h3>
              {newReport.reportData.map((data, index) => (
                <div key={index} className="flex space-x-4 mb-2">
                  <input
                    type="text"
                    name="key"
                    value={data.key}
                    onChange={(e) => handleReportDataChange(e, index)}
                    placeholder="Key"
                    required
                    className="border p-2 rounded"
                  />
                  <input
                    type="number"
                    name="value"
                    value={data.value}
                    onChange={(e) => handleReportDataChange(e, index)}
                    placeholder="Value"
                    required
                    className="border p-2 rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveReportData(index)}
                    className="bg-red-500 text-white py-1 px-2 rounded"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddReportData}
                className="text-green-500"
              >
                Add Data
              </button>
            </div>

            <button
              type="submit"
              className="bg-cyan-500 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Add Financial Report
            </button>
          </div>
        </form>
      )}

      {!isAdding && (
        <div className="p-8">
          <div className="flex flex-row items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">Financial Reports</h2>
            </div>
          </div>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={
                      selectedReports.length === reports.length &&
                      reports.length > 0
                    }
                  />
                </th>
                <th className="py-2 px-4 border-b text-left">Type</th>
                <th className="py-2 px-4 border-b text-left">Period Start</th>
                <th className="py-2 px-4 border-b text-left">Period End</th>
                <th className="py-2 px-4 border-b text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {currentReports.map((report) => (
                <tr key={report._id}>
                  <td className="py-2 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedReports.includes(report._id)}
                      onChange={(e) => handleCheckboxChange(e, report._id)}
                    />
                  </td>
                  <td className="py-2 px-4 border-b capitalize">
                    {report.type.replace("_", " ")}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(report.periodStart).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(report.periodEnd).toLocaleDateString()}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(report.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-4 absolute w-[75%] bottom-10">
            <button
              onClick={prevPage}
              className="mx-2 py-1 px-4 rounded-lg"
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            <p>
              Page {currentPage} of {Math.ceil(reports.length / reportsPerPage)}
            </p>
            <button
              onClick={nextPage}
              className="mx-2 py-1 px-4 rounded-lg"
              disabled={
                currentPage === Math.ceil(reports.length / reportsPerPage)
              }
            >
              &gt;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialReporting;
