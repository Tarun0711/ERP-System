import React from "react";

function PaymentVoucher() {
  const Data = [
    {
      name: "John Doe",
      date: "Manager",
      status: "Pending",
    },
    {
      name: "Jane Smith",
      date: "Assistant",
      status: "Approved",
    },
    {
      name: "Michael Johnson",
      date: "Supervisor",
      status: "Approved",
    },
    {
      name: "Emily Davis",
      date: "HR",
      status: "Approved",
    },
    {
      name: "John Doe",
      date: "Manager",
      status: "Approved",
    },
    {
      name: "Jane Smith",
      date: "Assistant",
      status: "Approved",
    },
    {
      name: "Michael Johnson",
      date: "Supervisor",
      status: "Pending",
    },
    {
      name: "Emily Davis",
      date: "HR",
      status: "Pending",
    },
  ];
  return (
    <div className="flex flex-col w-[50%] bg-white shadow-md rounded-xl p-4">
      <div className="font-bold text-xl mb-2">Payment Voucher</div>
      <div className="overflow-y-auto max-h-64 scrollbar-thin scrollbar-hidden hover:scrollbar-visible">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className=" text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 text-sm">S/N</th>
              <th className="px-4 py-2 text-sm">Subject</th>
              <th className="px-4 py-2 text-sm">Date</th>
              <th className="px-4 py-2 text-sm">Status</th>
            </tr>
          </thead>
          <tbody>
            {Data.map((staff, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-sm">{index + 1}</td>
                <td className="px-4 py-2 text-sm">{staff.name}</td>
                <td className="px-4 py-2 text-sm">{staff.date}</td>
                <td
                  className="px-4 py-2 text-sm"
                  style={{
                    color: staff.status === "Approved" ? "green" : "orange",
                  }}
                >
                  {staff.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PaymentVoucher;
