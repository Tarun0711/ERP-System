import React from "react";
import bg from "../../../assets/images/undermaintainance.jpg";

function CompensationAnalysis() {
  return (
    <div className="flex flex-col  items-center w-full bg-gray-100">
      <img src={bg} alt="Under Maintenance" className="mb-4 w-1/3 h-[70vh]" />
    </div>
  );
}

export default CompensationAnalysis;