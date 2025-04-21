import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/Inventory/SideBar";
import Navbar from "../../Components/Inventory/Navbar";

function Dashboard() {
  return (
    <>
      <div className="flex w-full h-screen bg-white overflow-hidden">
        <SideBar />
        <div className="w-full   font-inter ">
          <Navbar />
          <div className="flex-grow overflow-y-scroll h-[calc(100vh-3rem)]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
