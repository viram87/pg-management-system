import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, storage } from "../firebase";

import { getDownloadURL, ref } from "firebase/storage";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import ViewAll from "./ViewAll";

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
    // console.log("data.data()", data.data());
    setUserData(data?.data());
  };

  return (
    <div className="w-full bg-gray-100 h-[100vh]">
      <div className="w-full top-0">
        <Header />
      </div>
      {userData?.role == "owner" ? (
        <div>
          <ViewAll />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
