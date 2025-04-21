import React from "react";
import { FaBoxOpen } from "react-icons/fa";

function AccountDashboard() {
  const data = [
    {
      number: 52,
      title: "Total Orders",
      icon: FaBoxOpen,
      subtitle: "To be packed",
    },
    {
      number: 34,
      title: "Pending Orders",
      icon: FaBoxOpen,
      subtitle: "Awaiting Shipment",
    },
    {
      number: 12,
      title: "Completed Orders",
      icon: FaBoxOpen,
      subtitle: "Shipped and Delivered",
    },
    {
      number: 8,
      title: "Cancelled Orders",
      icon: FaBoxOpen,
      subtitle: "Order Cancellations",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="p-2 bg-white shadow-md rounded-lg transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-row items-center p-4 justify-between">
              {/* <div className="flex items-center justify-center text-indigo-600">
                <item.icon className="h-10 w-10" />
              </div> */}
              <div className="flex items-center gap-3">
                <div className="text-2xl font-bold text-gray-800 bg-gray-200 h-12 w-14 items-center justify-center flex rounded-md">
                  {item.number}
                </div>
                <p className="text-xl font-bold">{item.title}</p>
              </div>
              {/* <p className="text-sm text-gray-500">{item.subtitle}</p> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AccountDashboard;
