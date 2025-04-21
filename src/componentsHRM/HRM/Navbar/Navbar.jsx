import React from "react";
import { LuBellDot } from "react-icons/lu";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <nav className="bg-white fixed top-0 left-0 right-0 z-10">
      <div className="px-2 py-2 flex justify-between items-center">
        {/* Left Section: Company Logo and Name */}
        <div className="flex items-center space-x-2 ">
          <img
            src="https://via.placeholder.com/40"
            alt="Company Logo"
            className="h-10 w-10 rounded-full"
          />
          <span className="font-bold text-xl">Company Name</span>
        </div>

        {/* Right Section: Search, Notification, User */}
        <div className="flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              <IoIosSearch size={20} />
            </span>
            <input
              type="text"
              placeholder="Search or type a command (CTRL+G)"
              className="pl-10 pr-4 py-2 w-96 bg-gray-100 text-white rounded-full focus:outline-none"
            />
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <LuBellDot size={24}/>
          </div>

          {/* User Icon and Name */}
          <div className="flex items-center space-x-2">
            <img
              src="https://via.placeholder.com/40"
              alt="User Icon"
              className="h-10 w-10 rounded-full"
            />
            <span>John Doe</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
