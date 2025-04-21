import React from "react";
import TableComponent from "../../Components/TableComponentWithCheckBox";
import { useNavigate } from "react-router-dom";
const columns = [
  { Header: "Subject", accessor: "subject" },
  { Header: "Call Type", accessor: "call-type" },
  { Header: "Call started at", accessor: "started-at" },
  { Header: "call-duration", accessor: "duration" },
  { Header: "Related To", accessor: "related-to" },
  { Header: "Contact Name", accessor: "contact-name" },
  { Header: "Contact Owner", accessor: "contact-owner" },
];
const data = [
  {
    subject: "Meeting",
    "call-type": "Video Call",
    "started-at": "2023-09-21 10:00 AM",
    duration: "01:30",
    "related-to": "Project Development",
    "contact-name": "John Doe",
    "contact-owner": "Jane Smith",
  },
  {
    subject: "Meeting",
    "call-type": "Voice Call",
    "started-at": "2023-09-21 11:30 AM",
    duration: "00:45",
    "related-to": "Project Development",
    "contact-name": "Jane Smith",
    "contact-owner": "John Doe",
  },
  {
    subject: "Meeting",
    "call-type": "Video Call",
    "started-at": "20",
    duration: "01:15",
    "related-to": "Project Development",
    "contact-name": "John Doe",
    "contact-owner": "Jane Smith",
  },
];



function CallHome() {
    const navigate = useNavigate();

const HandleAddClick = () => {
  navigate("create-call");  
};
  return (
    <div className="w-full h-[90vh] pb-8">
      <div className="text-black mb-4 gap-10  flex justify-end ">
        <button onClick={HandleAddClick} className="bg-[#0097AB] text-white w-[213px] h-[38px] rounded-full">
          + Create Call
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
  );
}

export default CallHome;
