import React from "react";
import { Gauge } from "@mui/x-charts/Gauge";
import { LineChart } from "@mui/x-charts/LineChart";
import ReusableTable from "../../Components/TableComponent";
const columns = [
  { Header: "Channels", accessor: "channels" },
  { Header: "Draft", accessor: "draft" },
  { Header: "Confirmed", accessor: "confirmed" },
  { Header: "Packed", accessor: "Packed" },
  { Header: "Shipped", accessor: "shipped" },
  { Header: "Invoiced", accessor: "invoiced" },
];
const Data = [
  {
    channels: "Email",
    draft: 30,
    confirmed: 50,
    packed: 20,
    shipped: 10,
    invoiced: 40,
  },
  {
    channels: "Phone",
    draft: 20,
    confirmed: 60,
    packed: 15,
    shipped: 15,
    invoiced: 30,
  },
  {
    channels: "Social Media",
    draft: 10,
    confirmed: 70,
    packed: 10,
    shipped: 5,
    invoiced: 20,
  },
  {
    channels: "Direct Mail",
    draft: 5,
    confirmed: 80,
    packed: 5,
    shipped: 0,
    invoiced: 15,
  },
  {
    channels: "Influencer Marketing",
    draft: 0,
    confirmed: 90,
    packed: 0,
    shipped: 0,
    invoiced: 10,
  },
];
const SaleActivity = [
  {
    title: "To be Packed",
    count: 20,
    unit: "QTY",
  },
  {
    title: "To be Shipped",
    count: 45,
    unit: "PKGS",
  },
  {
    title: "To be Delivered",
    count: 15,
    unit: "PKGS",
  },
  {
    title: "To be Invoiced",
    count: 10,
    unit: "QTY",
  },
];
const SaleActivity1 = [
  {
    title: "Area Rug",
    count: 20,
  },
  {
    title: "Queen sized Net",
    count: 45,
  },
  {
    title: "Queen sized Net",
    count: 15,
  },
];

const data = [90, 20, 30, 40, 50, 60, 70, 80];
const xData = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function DashboardTabPanel1() {
  return (
    <div>
      <div className="flex gap-4">
        <div className="bg-white border-[0.5px] overflow-hidden rounded-lg w-[60%]">
          <h1 className="bg-richblack-5 px-4 border-b-[0.5px] text-xl py-2">
            Sales Activity
          </h1>
          <div className="p-4 flex  justify-between px-8 gap-4">
            {SaleActivity.map((item, index) => (
              <div
                key={index}
                className="border-r-[0.5px] w-full text-center py-2"
              >
                <p
                  className={`text-2xl ${
                    item.title === "TO be Packed"
                      ? "text-red-500"
                      : item.title === "To be Shipped"
                      ? "text-orange-500"
                      : item.title === "To be Delivered"
                      ? "text-green-500"
                      : "text-blue-500"
                  }`}
                >
                  {item.count}
                </p>
                <p className="text-sm">{item.unit}</p>
                <div className="text-md font-light text-richblack-500">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-lg border-[0.5px] w-[40%]">
          <h1 className="bg-richblack-5 px-4 border-b-[0.5px] text-xl py-2">
            Inventory Summary
          </h1>
          <div className="h-full justify-center center">
            <p className="flex center border-b-[0.2px] border-richblack-200 mx-2 py-4 text-richblack-400 text-xl justify-between px-8">
              Quantity in Hand <span className="text-black">12746</span>
            </p>
            <p className="flex  py-4  text-richblack-400 text-xl mx-2 justify-between px-8">
              Quantity to be Received
              <span className="text-black">12746</span>
            </p>
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="bg-white overflow-hidden w-full  rounded-lg border-[0.5px] ">
          <h1 className="bg-richblack-5 px-4 border-b-[0.5px] text-xl py-2">
            Product Details
          </h1>
          <div className="flex items-center gap-3">
            <div className="flex flex-col py-2 gap-4 w-[70%]">
              <p className="flex  py-2  text-richblack-400 text-xl mx-2 justify-between px-8">
                Low Stock Items
                <span className="text-black">12</span>
              </p>
              <p className="flex  py-2  text-richblack-400 text-xl mx-2 justify-between px-8">
                All Item Groups
                <span className="text-black">46</span>
              </p>
              <p className="flex  py-2  text-richblack-400 text-xl mx-2 justify-between px-8">
                Active Products
                <span className="text-black">274</span>
              </p>
            </div>
            <Gauge width={150} height={150} value={60} />
          </div>
        </div>
        <div className="bg-white overflow-hidden  rounded-lg border-[0.5px] w-full">
          <h1 className="bg-richblack-5 px-4 border-b-[0.5px] text-xl py-2">
            Top Selling Items
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {SaleActivity1.map((item, index) => (
              <div
                key={index}
                className="border-r-[0.5px] flex flex-col items-center justify-center gap-4 w-full text-center py-2"
              >
                <img
                  src="https://rukminim2.flixcart.com/image/850/1000/kh80vww0/portable-green-house/d/t/3/net-shade-for-garden-10x30ft-waderworld-original-imafxa4ghfzq9hb6.jpeg?q=90&crop=false"
                  height={100}
                  width={100}
                  className="rounded-lg"
                  alt="image"
                />
                <p className="text-sm text-richblack-200"> {item.title}</p>
                <div className="text-xl text-richblack-900">
                  {item.count} {"Pcs"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="bg-white overflow-hidden   rounded-lg border-[0.5px] w-[30%]">
          <h1 className="bg-richblack-5  px-4 border-b-[0.5px] text-xl py-2">
            Sales Report
          </h1>

          <div className="flex items-center justify-center flex-col">
            <p className="flex flex-col items-center border-b-[0.5px] py-2 w-full justify-center gap-4">
              <span className="text-black">Quantity Ordered</span>
              <span className="text-xl text-blue-500 font-semibold">100</span>
            </p>
            <p className="flex flex-col items-center justify-center py-2 gap-4">
              <span className="text-black">Total Cost</span>
              <span className="text-xl text-blue-500 font-semibold">
                Rs. 1,50,000
              </span>
            </p>
          </div>
        </div>
        <div className="bg-white overflow-hidden   rounded-lg border-[0.5px] w-[70%]">
          <h1 className="bg-richblack-5  px-4 border-b-[0.5px] text-xl py-2">
            Sales Report
          </h1>
          <ReusableTable columns={columns} data={Data} />
        </div>
      </div>
      <div className="mt-4 flex gap-4">
        <div className="bg-white overflow-hidden  rounded-lg border-[0.5px] w-[100%]">
          <h1 className="bg-richblack-5  px-4 border-b-[0.5px] text-xl py-2">
            Sales Performance
          </h1>
          <div className="p-5 flex border w-[100%]">
            <LineChart
              xAxis={[{ data: xData, scaleType: "point" }]}
              series={[{ data }]}
              height={200}
              margin={{ top: 10, bottom: 20 }}
            />
            <div className="border-l-[0.5px] pl-8 w-[30%]">
              <p>Total Sale</p>
              <div className="bg-blue-100 p-4 my-3 border-[0.5px] border-l-4 border-blue-500">
                <p className="flex flex-col ">
                    <span className="text-sm">
                        Direct Sales
                    </span>
                    <span className="text-md text-blue-500 font-semibold">
                      Rs. 1,50,000
                    </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTabPanel1;
