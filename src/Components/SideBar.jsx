import React from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "../Data/SidebarData";
import { useLocation, matchPath } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="w-full hidden bg-white md:w-[320px] h-[100vh] md:flex  py-3">
<div className="    w-full rounded-t-2xl md:rounded-s-2xl flex flex-col gap-6">
      <div className="flex flex-col md:gap-3">
        {SidebarData.map((key, index) => {
          return (
            <div
              key={index}
              className={`${
                matchRoute(key.path)
                  ? " text-white sm:rounded-lg py-1 md:px-4 px-1"
                  : "bg-transparent px-4"
              }`}
            >
              <Link
                className={`flex md:px-4 rounded-xl items-center justify-start md:gap-2 text-black
              ${
                matchRoute(key.path)
                  ? "md:text-white text-blue-500 md:bg-[#0097AB]"
                  : "bg-transparent text-richblack-400"
              }`}
                to={key.path}
              >
                <div className="flex items-center transition-all duration-400 ease-in-out hover:bg-[#0097AB] py-[8px] px-4 rounded-xl hover:text-white justify-start gap-4">
                  <span className="md:text-xl text-4xl">{key.icon}</span>
                  <span className="text-xl md:block hidden">{key.title}</span>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
    </div>
    
  );
}

export default Sidebar;
