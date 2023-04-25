import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { auth } from "../firebase";
import { Link } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="h-[60px] relative flex items-center  w-full bg-[#5371ff]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute z-10 right-0 mr-5 border profile  rounded-full p-2 cursor-pointer group"
      >
        <FaUserTie color="white" size={20} />
      </button>
      <div
        className={`absolute top-[55px] z-20 shadow-2xl p-3 ${
          isOpen ? "opacity-[100]" : "opacity-0"
        }  right-2 duration-300 transition-all ease-in-out rounded-xl h-fit w-[200px] bg-white`}
      >
        <ul>
          <li
            className="border-b py-2 cursor-pointer"
            // onClick={() => auth.signOut()}
          >
            <Link to="/user" className="flex gap-x-2 items-center ">
              <FiLogOut />
              <p className="m-0">View profile</p>
            </Link>
          </li>
          <li
            className="flex py-2 gap-x-2 items-center cursor-pointer"
            onClick={() => auth.signOut()}
          >
            <FaUserTie />
            <p className="m-0">Log out</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
