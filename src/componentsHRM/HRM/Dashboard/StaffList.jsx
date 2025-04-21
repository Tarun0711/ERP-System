import React, { useEffect, useState } from "react";

function StaffList() {
  const [staffData, setStaffData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const response = await fetch(
          "https://erp-backend-o5i3.onrender.com/api/employee/getEmployee"
        );
        const data = await response.json();
        setStaffData(data);
        console.log(data); // Updated to log fetched data instead of state
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col w-[50%] bg-white shadow-md rounded-xl p-4">
      <div className="font-bold text-xl mb-4">Staff List</div>

      <div className="overflow-y-auto max-h-64 scrollbar-thin scrollbar-hidden hover:scrollbar-visible">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className=" text-left text-gray-700 font-semibold">
              <th className="px-4 py-2 text-sm">S/N</th>
              <th className="px-4 py-2 text-sm">Staff Name</th>
              <th className="px-4 py-2 text-sm">Staff Role</th>
              <th className="px-4 py-2 text-sm">Designation</th>
            </tr>
          </thead>
          <tbody>
            {staffData.map((staff, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 text-sm">{index + 1}</td>
                <td className="px-4 py-2 text-sm">{staff.firstName} {staff.lastName}</td>
                <td className="px-4 py-2 text-sm">
                  {staff.role ? staff.role.charAt(0).toUpperCase() + staff.role.slice(1) : 'N/A'}
                </td>
                <td className="px-4 py-2 text-sm">
                  {staff.position ? staff.position.charAt(0).toUpperCase() + staff.position.slice(1) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StaffList;
