import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { BiArrowBack } from "react-icons/bi";

const UserProfile = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState();

  useEffect(() => {
    const localData = localStorage.getItem("userId");
    getData(localData || state.userId || state.data.userId);
  }, []);

  useEffect(() => {
    console.log("userData", userData);
  }, [userData]);

  const getData = async (id) => {
    console.log("id", id);
    const data = await getDoc(doc(db, "users", id));
    // console.log("data.data()", data.data());
    console.log("data", data.data());
    await setUserData(data.data() || data.data().data);
  };

  return (
    <div>
      <Header />
      <Link to="/home" className="absolute flex gap-x-2 items-center ml-2 mt-2">
        <BiArrowBack size={25} />
        <p className="outfit-medium text-lg">Back</p>
      </Link>
      <div className="absolute top-2/4 left-[20%] -translate-y-2/4 flex gap-x-10 ">
        <div className="border-black relative rounded-full border w-56 h-56 p-10 ">
          <img
            src={`https://robohash.org/${
              userData?.name?.split(" ")[0] ||
              userData?.data?.name?.split(" ")[0] ||
              "viram"
            }`}
            className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 mt-[-20px] w-[200px] h-[200px]"
          />
        </div>
        <div>
          <p className="outfit-regular text-lg">Role</p>
          <div className="grid grid-cols-2 col-span-2 gap-x-10">
            <label
              htmlFor="owner"
              className="cursor-pointer flex gap-x-3 mt-2 w-full col-span-1 rounded-2xl  items-center  border px-3 py-2"
            >
              <input
                checked={(userData?.role || userData?.data?.role) == "owner"}
                value="owner"
                name="role"
                id="owner"
                type="radio"
              />
              <p className="text-lg outfit-regular" htmlFor="owner">
                Owner
              </p>
            </label>
            <label
              htmlFor="seeker"
              className="cursor-pointer col-span-1 w-full mt-2 flex gap-x-3 rounded-2xl  items-center  border px-3 py-2"
            >
              <input
                checked={userData?.role || userData?.data?.role == "seeker"}
                value="seeker"
                name="role"
                id="seeker"
                type="radio"
              />
              <p className="text-lg outfit-regular" htmlFor="seeker">
                Seeker
              </p>
            </label>
          </div>

          <p className="outfit-regular text-lg mt-3">Name</p>
          <input
            type="name"
            className="h-[45px] mt-2 w-[400px] px-3 border rounded-xl poppins-regular text-base focus:border-[#5371ff] outline-none"
            placeholder=""
            disabled
            value={userData?.name || userData?.data?.name}
          />
          <p className="outfit-regular text-lg mt-3">Name</p>
          <input
            type="email"
            className="h-[45px] w-[400px] mt-2 px-3 border rounded-xl poppins-regular text-base focus:border-[#5371ff] outline-none"
            placeholder=""
            disabled
            value={userData?.email || userData?.data?.email}
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
