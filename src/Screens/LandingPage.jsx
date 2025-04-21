import React from "react";
import { Link } from "react-router-dom";
const Data = [
  {
    title: "CRM",
    path: "/crm",
    img: "https://png.pngtree.com/png-clipart/20230823/original/pngtree-crm-icon-customer-relationship-management-picture-image_8207371.png",
    bg: "bg-pink-400",
  },
  {
    title: "HRM",
    path: "/hrm/dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/10722/10722355.png",
    bg: "bg-yellow-400",
  },
  {
    title: "Inventory",
    path: "/inventory",
    img: "https://cdn-icons-png.flaticon.com/512/10469/10469240.png",
    bg: "bg-green-400",
  },
  {
    title: "Account and Finance",
    path: "/sales/dashboard",
    img: "https://cdn-icons-png.flaticon.com/512/9503/9503519.png",
    bg: "bg-blue-400",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen w-full flex-col flex items-center justify-center bg-richblack-5">
      <div className="flex flex-wrap gap-4 w-[50%] items-center h-full justify-center">
        {Data.map((item, index) => (
          <Link key={index} to={item.path}>
            <div
              className={`flex flex-col  h-[200px] w-[350px] ${item.bg} items-center justify-center rounded-lg cursor-pointer transition-all duration-300`}
            >
              <img
                className="h-[140px] w-[130px]"
                src={item.img}
                alt={item.title}
              />
              <p className="text-xl">{item.title}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
