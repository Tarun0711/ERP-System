import React from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgMenuGridO } from "react-icons/cg";
import BackToHome from "../BackToHome";

function Navbar() {
  return (
    <div className="bg-richblue-5 border-b-[0.5px] flex px-4  py-2 justify-between items-center w-full">
            <BackToHome/>

      <div className="flex items-center justify-center h-9 bg-[#fff] rounded-2xl overflow-hidden cursor-pointer pl-4 ">

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
          className="w-[300px] hover:w-[350px] transition-all ease-in-out duration-300 bg-[#fff] h-full border-none outline-none text-sm caret-blue-500"
        />
      </div>
      <div className="md:flex gap-6 items-center">
          <IoIosNotificationsOutline fontSize={24} />
          <img
            src="https://th.bing.com/th/id/OIP.IGNf7GuQaCqz_RPq5wCkPgHaLH?rs=1&pid=ImgDetMain"
            className="  h-[35px] w-[35px] rounded-full"
            alt="user"
          />
          {/* <CgMenuGridO fontSize={29}/> */}
        </div>
    </div>
  );
}

export default Navbar;
