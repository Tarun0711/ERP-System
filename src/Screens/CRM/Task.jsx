import React from "react";
import { Outlet } from "react-router-dom";

function Task() {
  return (
    <div className="h-full w-full ">
      <Outlet />
    </div>
  );
}

export default Task;
