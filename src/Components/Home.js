import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";

import { getDownloadURL, ref } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import ViewAll from "./ViewAll";
import Seekers from "./Seekers";
import Admin from "./Admin";

const Home = () => {
  const { state } = useLocation();
  const [userData, setUserData] = useState();
  const storageRef = ref(storage, "pg-images");

  getDownloadURL(ref(storageRef, "pgFIve.jfif")).then((e) => {
    console.log(e, "image url");
  });

  useEffect(() => {
    const localData = localStorage.getItem("userId");
    getData(localData || state.userId);
  }, []);

  const getData = async (id) => {
    const data = await getDoc(doc(db, "users", id));
    await setUserData(data?.data());
  };

  console.log("currnet user", userData);

  return (
    <div className="w-full bg-gray-100 h-[100vh]">
      <div className="w-full top-0">
        <Header />
      </div>

      {(userData?.role || userData?.data.role) === "owner" ? (
        <div>
          <ViewAll user={userData} />
        </div>
      ) : null}

      {(userData?.role || userData?.data.role) === "seeker" ? (
        <div>
          <Seekers user={userData} />
        </div>
      ) : null}

      {(userData?.role || userData?.data.role) === "admin" ? (
        <div className="h-full">
          <Admin user={userData}/>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
