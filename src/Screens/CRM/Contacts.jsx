
import React from "react";
import { Outlet } from "react-router-dom";
function Contacts() {
  return (
    <div className='h-full w-full '>
      <Outlet/>
    </div>
  );
}

export default Contacts;
