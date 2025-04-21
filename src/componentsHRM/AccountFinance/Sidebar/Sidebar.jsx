import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiListIndefinite } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { SiExpensify } from "react-icons/si";
import { CgBorderTop } from "react-icons/cg";
import { MdOutlineWifiFind } from "react-icons/md";
const Sidebar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("/sales");
  const handleClick = (item) => {
    setActiveItem(item);
    navigate(item);
  };
  return (
    <div className="bg-white w-64 min-h-screen fixed top-16 z-10 left-10 gap-2">
      <ul className="py-4">
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/sales/dashboard" ? "bg-gray-100 rounded-l-lg" : ""
          }`}
          onClick={() => handleClick("/sales/dashboard")}
        >
          <MdOutlineDashboard size={24} className="mr-3" />
          <span className="text-sm font-semibold">Dashboard</span>
        </li>
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/sales/sales-management"
              ? "bg-gray-100 rounded-l-lg"
              : ""
          }`}
          onClick={() => handleClick("/sales/sales-management")}
        >
          <RiListIndefinite size={24} className="mr-3" />
          <span className="text-sm font-semibold">Sales Management</span>
        </li>
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/sales/expenses" ? "bg-gray-100 rounded-l-lg" : ""
          }`}
          onClick={() => handleClick("/sales/expenses")}
        >
          <div className="flex items-center">
            <SiExpensify size={24} className="mr-3" />
            <span className="text-sm font-semibold">Expense Management</span>
          </div>
        </li>
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/sales/purchase-order"
              ? "bg-gray-100 rounded-l-lg"
              : ""
          }`}
          onClick={() => handleClick("/sales/purchase-order")}
        >
          <div className="flex items-center">
            <CgBorderTop size={24} className="mr-3" />
            <span className="text-sm font-semibold">Orders And Bills</span>
          </div>
        </li>
        <li
          className={`px-6 py-3 hover:bg-gray-100 flex items-center cursor-pointer rounded-l-lg ${
            activeItem === "/sales/financial-reporting"
              ? "bg-gray-100 rounded-l-lg"
              : ""
          }`}
          onClick={() => handleClick("/sales/financial-reporting")}
        >
          <div className="flex items-center">
            <MdOutlineWifiFind size={24} className="mr-3" />
            <span className="text-sm font-semibold">Financial Reporting</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
