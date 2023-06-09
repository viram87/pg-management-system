import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./Components/Home";
import UserProfile from "./Components/userProfile";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRote";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import AddNew from "./Components/AddNew";
import ViewPg from "./Components/ViewPg";


function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedin(true);
    } else {
      setIsLoggedin(false);
    }
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute isLoggedin={isLoggedin}>
                <div>
                  <Home />
                </div>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/add-new"
            element={
              <PrivateRoute isLoggedin={isLoggedin}>
                <div>
                  <AddNew />
                </div>
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/view"
            element={
              <PrivateRoute isLoggedin={isLoggedin}>
                <div>
                  <ViewPg />
                </div>
              </PrivateRoute>
            }
          ></Route>
          <Route path="/user" exact element={<UserProfile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

const PageNotFound = () => {
  return <div>page not found</div>;
};

export default App;
