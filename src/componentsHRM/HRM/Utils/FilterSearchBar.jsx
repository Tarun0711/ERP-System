import React, { useState } from 'react'
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosSearch } from "react-icons/io";
function FilterSearchBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
      <div className="flex flex-row justify-end items-center w-full mt-4">
        <div className="flex flex-row items-center gap-5">
          <button className="w-16 h-10 bg-cyan-500 text-white rounded-md">
            Filter
          </button>
          <div className="relative">
            <span className="absolute left-3 top-2 text-gray-400">
              <IoIosSearch size={24} />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-80 bg-white rounded-full focus:outline-none"
            />
          </div>
          <div className="relative">
            <button onClick={toggleMenu} className="text-gray-500">
              <HiOutlineDotsVertical size={24} color="black" />
            </button>
            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute left-5 w-40 bg-white rounded-md shadow-lg z-10">
                <ul className="py-1">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Edit
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Delete
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Alter
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

  )
}

export default FilterSearchBar
