import React from "react";
import SearchBar from "./SearchBar";
import { RiNotification2Line } from "react-icons/ri";
import { RiMenu4Line } from "react-icons/ri";
import { RiNotification2Fill } from "react-icons/ri";
import BackToHome from "./BackToHome";

function Navbar() {
  return (
    <div className="bg-white  md:min-h-[70px] px-3 w-full flex items-center ">
      <div className=" md:flex hidden justify-between w-full items-center">
      <BackToHome/>
      <div className="md:flex gap-6 items-center">
          <SearchBar />
          <RiNotification2Line fontSize={24} />
          {/* <img
            src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain"
            className="  h-[50px] w-[50px] rounded-full"
            alt="user"
          /> */}
        <h1>Company Name</h1>
        </div>
      </div>

      <div className="md:hidden pt-8 pb-4 bg-white gap-6 flex w-full flex-col justify-between items-center">
        <div className="flex w-full justify-between items-center">
          <p className="bg-black p-3 rounded-2xl">
            <RiMenu4Line color="#fff" fontSize={32} />
          </p>
          <p className="bg-black p-3 rounded-2xl">
            <RiNotification2Fill color="#fff" fontSize={32} />
          </p>
        </div>
        <div className="w-[90%]">
          <div className="flex items-center border justify-center h-10 bg-[#fff] rounded-2xl overflow-hidden cursor-pointer pl-4 ">
            <label htmlFor="input" className="cursor-text px-3">
              <svg viewBox="0 0 512 512" className="w-3">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
              </svg>
            </label>
            <input
              type="text"
              name="text"
              id="input"
              placeholder="Search or type a command (Ctrl + G)"
              className="w-[389px] bg-[#fff] border h-full border-none outline-none text-sm caret-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
