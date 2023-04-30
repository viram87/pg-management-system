import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const AddNew = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    rent: "",
    db_sharing: "",
    tr_sharing: "",
    contact: "",
    role: "",
    location: "",
  });
  const [currentUser, setCurrentUser] = useState({});

  const submitHandler = async (event) => {
    event.preventDefault();
    let tmpArray = [];
    let data = (await getDoc(doc(db, "users", currentUser.data.uid))).data()
      .data;
    tmpArray = data.hostels;
    tmpArray.push(userData);
    data.hostels = tmpArray;
    await setDoc(doc(db, "users", currentUser.data.uid), {
      data,
    });
    setUserData({
      contact: "",
      db_sharing: "",
      rent: "",
      role: "",
      tr_sharing: "",
      location: "",
    });
    setTimeout(() => {
      navigate("/home");
    }, 100);
  };

  useEffect(() => {
    setCurrentUser(state.state);
  }, [state]);

  // console.log(currentUser);

  const changeHandler = (event) => {
    if (event.target.name === "role" || event.target.name === "location") {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value,
      });
    } else {
      setUserData({
        ...userData,
        [event.target.name]: event.target.value.replace(/[^0-9]/gi, ""),
      });
    }
    // setMessage(result);
  };

  return (
    <div>
      <Header />
      <Link to="/home" className="w-fit px-5 py-2 flex gap-x-2 items-center">
        <BiArrowBack />
        <div className=" poppins-medium">Back</div>
      </Link>
      <div className="p-5">
        <p className="poppins-medium text-xl">Add new paying guest</p>
        <form
          onSubmit={submitHandler}
          className="mt-5 flex flex-col gap-y-5  items-center"
        >
          <div className="w-[500px]">
            <p className="outfit-regular">Monthly rent</p>
            <input
              required
              type="text"
              placeholder="Enter your rent in INR"
              value={userData.rent}
              maxLength={5}
              className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
              name="rent"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="w-[500px] flex gap-x-5">
            <div>
              <p className="outfit-regular">Double sharing rent</p>
              <input
                type="text"
                value={userData.db_sharing}
                placeholder="Enter double sharing rent"
                maxLength={5}
                className="w-full mt-2 h-[45px] px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
                name="db_sharing"
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div>
              <p className="outfit-regular">Triple sharing rent</p>
              <input
                type="text"
                value={userData.tr_sharing}
                placeholder="Enter triple sharing rent"
                maxLength={5}
                className="w-full mt-2 h-[45px] px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
                name="tr_sharing"
                onChange={(e) => changeHandler(e)}
              />
            </div>
          </div>
          <div className="w-[500px]">
            <p className="outfit-regular">Contact number</p>
            <input
              required
              type="text"
              value={userData.contact}
              placeholder="Contact number (+xx-xxx xxx xxx)"
              maxLength={12}
              className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
              name="contact"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <div className="w-[500px] grid grid-cols-2 col-span-2 gap-x-10">
            <label
              htmlFor="Girls"
              className="cursor-pointer flex gap-x-3 mt-2 w-full col-span-1 rounded-2xl  items-center  border px-3 py-2"
            >
              <input
                onChange={(e) => changeHandler(e)}
                value="Girls"
                name="role"
                checked={userData.role === "Girls"}
                id="Girls"
                type="radio"
              />
              <p className="text-lg outfit-regular" htmlFor="Girls">
                Girls
              </p>
            </label>
            <label
              htmlFor="Boys"
              className="cursor-pointer col-span-1 w-full mt-2 flex gap-x-3 rounded-2xl  items-center  border px-3 py-2"
            >
              <input
                onChange={(e) => changeHandler(e)}
                value="Boys"
                checked={userData.role === "Boys"}
                name="role"
                id="Boys"
                type="radio"
              />
              <p className="text-lg outfit-regular" htmlFor="Boys">
                Boys
              </p>
            </label>
          </div>
          <div className="w-[500px]">
            <p className="outfit-regular">Location</p>
            <input
              required
              type="text"
              value={userData.location}
              placeholder="Enter location"
              className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
              name="location"
              onChange={(e) => changeHandler(e)}
            />
          </div>
          <button
            className="w-full border max-w-[500px] py-3 rounded-xl bg-[#5371ff] text-white"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
