import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const Admin = ({ user }) => {
  const [allUsers, setallUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [owner, setOwner] = useState([]);

  const [currrent, setCurrent] = useState(1);

  const fetchData = async () => {
    const q = query(collection(db, "users"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);

    querySnapshot.docs.forEach((doc) => {
      const userData = doc.data();
      setallUsers((prevUsers) => [...prevUsers, doc.data()]);
      if (userData.role === "seeker") {
        setUsers((prevUsers) => [...prevUsers, userData]);
      } else if (userData.role === "owner") {
        setOwner((prevUsers) => [...prevUsers, userData]);
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("User", users, owner);

  return (
    <div className="grid grid-cols-5 h-full ">
      <div className="bg-[#5371ff] h-full border-2">
        <div className="sidebar">
          <ul>
            <li>
              <i className="fas fa-user"></i>
              <span onClick={() => setCurrent(1)}>User</span>
              <ul className="sub-menu">
                <li onClick={() => setCurrent(2)}>Registered owners</li>
                <li onClick={() => setCurrent(3)}>Registered users</li>
              </ul>
            </li>
            <li>
              <i className="fas fa-info-circle"></i>
              <span>About</span>
            </li>
            <li>
              <i className="fas fa-envelope"></i>
              <span>Contact</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="col-span-4">
        {currrent == 1 ? (
          <div onClick={""} className="p-5 cursor-pointer">
            <p className="outfit-medium text-3xl">All owners and users</p>
            <div className="bg-[#A4C8FF] w-[300px] h-[200px] rounded-xl mt-5 flex items-center justify-center">
              <p className="text-5xl">{allUsers.length}</p>
            </div>
          </div>
        ) : currrent == 2 ? (
          <div onClick={""} className="p-5 cursor-pointer">
            <p className="outfit-medium text-3xl">All users</p>
            <div className="bg-[#A4C8FF] w-[300px] h-[200px] rounded-xl mt-5 flex items-center justify-center">
              <p className="text-5xl">{users.length}</p>
            </div>
          </div>
        ) : (
          <div onClick={""} className="p-5 cursor-pointer">
            <p className="outfit-medium text-3xl">All owners </p>
            <div className="bg-[#A4C8FF] w-[300px] h-[200px] rounded-xl mt-5 flex items-center justify-center">
              <p className="text-5xl">{owner.length}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
