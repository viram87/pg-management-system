import { doc, getDoc } from "firebase/firestore";
import React, { useEffect } from "react";
import { auth, db } from "../firebase";

import { useLocation } from "react-router-dom";

const Home = () => {
  const { state } = useLocation();

  useEffect(() => {
    const localData = localStorage.getItem("userId");
    getData(localData || state.userId);
  }, []);

  const getData = async (id) => {
    const data = await getDoc(doc(db, "users", id));
    console.log("data.data()", data.data());
  };

  return (
    <div className="cursor-pointer" onClick={() => auth.signOut()}>
      log out
    </div>
  );
};

export default Home;
