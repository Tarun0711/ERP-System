import React from "react";
import { CgHome } from "react-icons/cg";
import { Link } from "react-router-dom";

function BackToHome() {
  return (
    <Link className="p-2 flex items-center gap-2 rounded-lg bg-blue-500 text-white" to="/">
      Back To Home <CgHome/>
    </Link>
  );
}

export default BackToHome;
