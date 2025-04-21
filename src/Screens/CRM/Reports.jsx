import React from 'react'
import TableComponent from '../../Components/TableComponentWithCheckBox'

const columns = [
    { Header: "Report name", accessor: "report-name" },
    { Header: "Description", accessor: "due-date" },
    { Header: "Folder", accessor: "folder" },
    { Header: "Latest Accessed Date", accessor: "access-date" },
    { Header: "Contact by", accessor: "created-by" }
  ];
  
  const data = [
    { 'report-name': "Report 1", 'due-date': "2024-09-15", 'folder': "Folder 1", 'access-date': "2024-09-10", 'created-by': "John Doe" },
    { 'report-name': "Report 2", 'due-date': "2024-10-01", 'folder': "Folder 2", 'access-date':"2024-09-15",  'created-by': "Jane Smith" },
    { 'report-name': "Report 3", 'due-date': "2024-09-20", 'folder': "Folder 3", 'access-date': "2024-09-15", 'created-by': "Alice Johnson" },
    { 'report-name': "Report 4", 'due-date': "2024-10-15", 'folder': "Folder 4", 'access-date': "2024-09-15", 'created-by': "Bob Brown" },
    { 'report-name': "Report 5", 'due-date': "2024-10-05", 'folder': "Folder 5", 'access-date': "2024-09-15", 'created-by': "Emily White" },
    { 'report-name': "Report 6", 'due-date': "2024-09-30", 'folder': "Folder 6", 'access-date': "2024-09-15", 'created-by': "John Doe" },
    { 'report-name': "Report 7", 'due-date': "2024-10-10", 'folder': "Folder 7", 'access-date': "2024-09-15", 'created-by': "Jane Smith" },
    { 'report-name': "Report 8", 'due-date': "2024-09-25", 'folder': "Folder 8", 'access-date': "2024-09-15", 'created-by': "Alice Johnson" }
    ]
function Reports() {
  return (
    <div className="w-full h-[90vh] pb-8">
      <div className="text-black mb-4 gap-10  flex justify-end ">
        <button className="bg-[#0097AB] text-white w-[213px] h-[38px] rounded-full">
          + Create Report
        </button>
        <div className="flex items-center justify-center h-10 bg-[#fff] rounded-2xl overflow-hidden cursor-pointer pl-4 ">
          <label htmlFor="input" className="cursor-text px-3">
            <svg viewBox="0 0 512 512" className="w-3">
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
            </svg>
          </label>
          <input
            type="text"
            name="text"
            id="input"
            placeholder="Search or type a command"
            className="w-[389px] bg-[#Fff] h-full border-none outline-none text-sm caret-blue-500"
          />
        </div>
      </div>
      <div className="bg-white h-[90vh] rounded-2xl">
        <TableComponent columns={columns} data={data} />
      </div>
    </div>
  )
}

export default Reports