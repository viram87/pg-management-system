import React from "react";
import { auth } from "../firebase";
import { FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="">
      <div
        className="flex items-center justify-center gap-x-3 absolute bottom-0 w-[90%] py-3 px-2 rounded-xl text-center bg-[#4264e3] cursor-pointer text-white m-3"
        onClick={() => auth.signOut()}
      >
        <p className="poppins-medium text-xl">Log out</p>
        <FiLogOut />
      </div>
    </div>
  );
};

export default Sidebar;
