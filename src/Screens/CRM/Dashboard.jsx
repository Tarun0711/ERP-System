import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/SideBar";
import Navbar from "../../Components/Navbar";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col w-full h-screen bg-white md:bg-richblack-5 overflow-hidden">
        <Navbar />
        <div className="flex h-full relative">
          <div className="">
            <Sidebar />
          </div>
          <div className=" w-full md:p-4 p-2 bg-white md:bg-richblack-5 ">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
