import React from "react";
import bg from "../../../assets/images/undermaintainance.jpg";

function CompilanceRisk() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen bg-gray-100">
      <img src={bg} alt="Under Maintenance" className="mb-4 w-1/2 h-auto" />
    </div>
  );
}

export default CompilanceRisk;
