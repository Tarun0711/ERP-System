import React from "react";
// import HomeCard from "../Components/HomeCard";
import BasicTable from "../../Components/TableComponent";
import { AiFillLike } from "react-icons/ai";
import { TbXboxXFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { FaUser } from "react-icons/fa";

const Data = [
  {
    title: "Deals Today",
    num: "12",
    icon: <AiFillLike color="#005FB7" />,
    color: "bg-[#005FB7]",
  },
  {
    title: "Untouched Deals",
    num: "9",
    icon: <TbXboxXFilled color="#FF3232" />,
    color: "bg-[#FF3232]",
  },
  {
    title: "Calls today",
    num: "13",
    icon: <IoCall color="#00BA34" />,
    color: "bg-[#00BA34]",
  },
  {
    title: "Leads",
    num: "4",
    icon: <FaUser color="#3E02AE" />,
    color: "bg-[#3E02AE]",
  },
];

const OtherData = [
  {
    title: "My open tasks",
    column: [
      { Header: "Subject", accessor: "subject" },
      { Header: "Due Date", accessor: "due-date" },
      { Header: "Name", accessor: "name" },
      { Header: "Priority", accessor: "priority" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Contact NO", accessor: "contact" },
    ],

    data: [
      {
        subject: "Math Assignment",
        "due-date": "2024-09-30",
        name: "John Doe",
        priority: "High",
        quantity: 1,
        contact: "123-456-7890",
      },
      {
        subject: "Science Project",
        "due-date": "2024-10-05",
        name: "Jane Smith",
        priority: "Medium",
        quantity: 2,
        contact: "987-654-3210",
      },
      {
        subject: "History Essay",
        "due-date": "2024-09-25",
        name: "Alice Johnson",
        priority: "Low",
        quantity: 1,
        contact: "555-123-4567",
      },
      {
        subject: "English Report",
        "due-date": "2024-10-10",
        name: "Bob Brown",
        priority: "High",
        quantity: 3,
        contact: "222-333-4444",
      },
      {
        subject: "Art Project",
        "due-date": "2024-10-01",
        name: "Emily White",
        priority: "Medium",
        quantity: 1,
        contact: "111-222-3333",
      },
    ],
  },
  {
    title: "My Meetings",
    column: [
      { Header: "Title", accessor: "title" },
      { Header: "From", accessor: "from" },
      { Header: "To", accessor: "to" },
      { Header: "Name", accessor: "name" },
      { Header: "Contact NO", accessor: "contact" },
    ],
    data: [
      {
        title: "Meeting with John",
        from: "10:00 AM",
        to: "11:00 AM",
        name: "John Doe",
        contact: "123-456-7890",
      },
      {
        title: "Meeting with Jane",
        from: "11:00 AM",
        to: "12:00 PM",
        name: "Jane Smith",
        contact: "987-654-3210",
      },
      {
        title: "Meeting with Alice",
        from: "12:00 PM",
        to: "1:00 PM",
        name: "Alice Johnson",
        contact: "555-123-4567",
      },
    ],
  },
  {
    title: "Todays leads",
    column: [
      { Header: "Name", accessor: "name" },
      { Header: "Requirement", accessor: "requirement" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Phone", accessor: "phone" },
    ],
    data: [
      {
        name: "John Doe",
        requirement: "Engineering project",
        quantity: 2,
        phone: "123-456-7890",
      },
      {
        name: "Jane Smith",
        requirement: "Art project",
        quantity: 1,
        phone: "987-654-3210",
      },
      {
        name: "Jane Smith",
        requirement: "Art project",
        quantity: 1,
        phone: "987-654-3210",
      },
      {
        name: "Jane Smith",
        requirement: "Art project",
        quantity: 1,
        phone: "987-654-3210",
      },
      {
        name: "Jane Smith",
        requirement: "Art project",
        quantity: 1,
        phone: "987-654-3210",
      },
    ],
  },
  {
    title: "my deals closing this month",
    column: [
      { Header: "Name", accessor: "name" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Stage", accessor: "stage" },
      { Header: "Closing date", accessor: "closing-date" },
      { Header: "Deal Owner", accessor: "deal-owner" },
      { Header: "Contact No", accessor: "contact" },
    ],
    data: [
      {
        name: "John Doe",
        amount: "$1,000,000",
        stage: "Closed Won",
        "closing-date": "2024-10-30",
        "deal-owner": "John Doe",
        contact: "123-456-7890",
      },
      {
        name: "Jane Smith",
        amount: "$500,000",
        stage: "Closed Lost",
        "closing-date": "2024-10-25",
        "deal-owner": "Jane Smith",
        contact: "987-654-3210",
      },
    ],
  },
];

function Home() {
  return (
    <div className="w-full h-[90vh] pb-8 overflow-y-scroll">
      <div className="md:flex mt-14 hidden flex-wrap w-full gap-4">
        {Data.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl w-full md:w-[317px] h-[125px] md:h-[164px] p-4"
          >
            <h2 className="text-2xl font-bold ">
              {"My "}
              {item.title}
            </h2>
            <p className="text-4xl font-thin md:mt-8">{item.num}</p>
          </div>
        ))}
      </div>
      <div className="md:hidden flex gap-4 flex-col ">
        {Data.map((item, index) => (
          <div
            key={index}
            className="h-[125px] w-full bg-[#F4F1F1] rounded-2xl border-2 flex justify-between items-center px-4"
          >
            <p className="bg-white text-4xl h-[91px] w-[91px] text-center flex items-center justify-center rounded-2xl font-thin ">
              {item.num}
            </p>
            <div className="w-44 text-start">
              <p className="font-bold text-xl">
                {"My "} {item.title}
              </p>
              <span className="font-thin text-md">{item.title}</span>
            </div>
            <p className={`${item.color} bg-opacity-20  h-[47px] w-[47px] rounded-full flex items-center text-2xl justify-center`}>{item.icon}</p>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 mt-8">
        {OtherData.map((item, index) => (
          <div
            key={index}
            className="w-[663px] h-[320px] p-4 bg-white rounded-[30px] shadow-lg"
          >
            <h1 className="text-xl px-4 font-bold">{item.title}</h1>
            <div>
              <BasicTable columns={item.column} data={item.data} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
