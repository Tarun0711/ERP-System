import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImCart } from "react-icons/im";
import { GoHome } from "react-icons/go";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { SlHandbag } from "react-icons/sl";
import { TiFlowSwitch } from "react-icons/ti";
import { MdOutlineFolderCopy } from "react-icons/md";

const Data = [
  {
    title: "Home",
    path: "/inventory",
    icon: <GoHome />,
  },
  {
    title: "Inventory Control",
    icon: <ImCart />,
    InnerItems: [
      {
        title: "Stock Management",
        path: "/inventory/stock-management",
      },
      // {
      //   title: "SKU Management",
      //   path: "/inventory/sku-management",
      // },
    ],
  },
  {
    title: "Warehouse Management",
    icon: <SlHandbag />,
    InnerItems: [
      {
        title: "Warehouse Layout",
        path: "/inventory/warehouse/layout",
      },
      {
        title: "Bin Management",
        path: "/inventory/warehouse/bin-management",
      },
      {
        title: "Receiving and Putaway",
        path: "/inventory/warehouse/receiving-putaway",
      },
    ],
  },
  {
    title: "Order Management",
    icon: <TiFlowSwitch />,
    InnerItems: [
      {
        title: "Purchase Orders",
        path: "/inventory/order/purchase-orders",
      },
      {
        title: "Sales Orders",
        path: "/inventory/order/sales-orders",
      },
      {
        title: "Backorders and Preorders",
        path: "/inventory/order/backorders-preorders",
      },
    ],
  },
  {
    title: "Inventory Auditing and Reporting",
    icon: <MdOutlineFolderCopy />,
    InnerItems: [
      {
        title: "Cycle Counting",
        path: "/inventory/auditing/cycle-counting",
      },
      {
        title: "Audit Trails",
        path: "/inventory/auditing/audit-trails",
      },
      {
        title: "Reporting and Analytics",
        path: "/inventory/auditing/reporting-analytics",
      },
    ],
  },
  {
    title: "Multi-Location Inventory Management",
    icon: <TiFlowSwitch />,
    InnerItems: [
      {
        title: "Centralized Control",
        path: "/inventory/multi-location/centralized-control",
      },
      {
        title: "Stock Transfers",
        path: "/inventory/multi-location/stock-transfers",
      },
    ],
  },
];

function SideBar() {
  const [openIndex, setOpenIndex] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveItem = (path) => location.pathname === path;
  const isInnerItemActive = (innerItems) =>
    innerItems?.some((item) => location.pathname === item.path);

  const handleItemClick = (path, hasInnerItems, index) => {
    if (hasInnerItems) {
      setOpenIndex(openIndex === index ? null : index);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="bg-white overflow-y-scroll font-inter w-[300px] h-screen text-black">
      <div className="flex justify-center transition-all duration-300 items-center gap-3 text-xl py-3 bg-white">
        <ImCart />
        <p>Inventory</p>
      </div>
      <div className="flex flex-col gap-3">
        {Data.map((item, index) => {
          const isOpen = openIndex === index || isInnerItemActive(item.InnerItems);
          const isParentItemActive = isInnerItemActive(item.InnerItems);

          return (
            <div
              key={index}
              className={`relative flex flex-col gap-2 ${
                item.InnerItems ? "cursor-pointer" : ""
              }`}
              onClick={() => handleItemClick(item.path, !!item.InnerItems, index)}
            >
              <div
                className={`flex gap-3 mt-4 rounded-xl items-center px-4 mx-2 py-2 ${
                  isParentItemActive
                    ? "bg-transparent text-blue-500"
                    : isActiveItem(item.path)
                    ? "bg-[#0097AB] text-white"
                    : "hover:bg-[#0097AB]"
                }`}
              >
                <p>{item.icon}</p>
                <p className="text-sm">{item.title}</p>
                {item.InnerItems && (
                  <MdOutlineArrowDropDown
                    fontSize={24}
                    className={`transform transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              <div
                className={`flex flex-col pl-6 space-y-2 transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96" : "max-h-0 overflow-hidden"
                }`}
              >
                {item.InnerItems &&
                  item.InnerItems.map((innerItem, innerIndex) => (
                    <div
                      key={innerIndex}
                      className={`cursor-pointer text-sm py-1 px-4 rounded-lg ${
                        isActiveItem(innerItem.path)
                          ? "bg-[#0097AB] text-white"
                          : "hover:bg-[#0097AB]"
                      }`}
                      onClick={() => navigate(innerItem.path)}
                    >
                      {innerItem.title}
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
