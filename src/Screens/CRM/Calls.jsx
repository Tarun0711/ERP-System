import React from "react";
import { Outlet } from "react-router-dom";
function Calls() {
  return (
    <div className='h-full w-full '>
      <Outlet/>
    </div>
  );
}

export default Calls;
