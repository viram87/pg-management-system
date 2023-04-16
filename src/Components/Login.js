import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import "../App.css";
import { userIcon } from "../assets/asset";
import { auth, db } from "../firebase";
import ErrorMessage from "./Errors";

const Login = () => {
  const navigate = useNavigate();
  const { toggle, value } = useBoolean(false);
  const [isLogin, setIsLogin] = useState(true);
  const [authenticationErrors, setAuthenticationErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({
    email: "",
    name: "",
    role: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
    mode: "onSubmit",
  });

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoading(false);
      localStorage.setItem("userId", user.uid);
      navigate("/home", {
        state: {
          userID: user.uid,
        },
      });
    }
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (isLogin) {
      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).catch((errors) => {
        console.log(errors.code);
      });

      setUserDetails({
        email: result.user.email,
        uid: result.user.uid,
        name: data.name,
        role: data.role,
      });
    } else {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      ).catch((errors) => {
        setIsLoading(false);
        console.log(errors.code);
        if (errors.code == "auth/email-already-in-use") {
          toast.error("Email address is already in use!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
        setAuthenticationErrors(errors);
      });
      setUserDetails({
        email: result.user.email,
        uid: result.user.uid,
        name: data.name,
        role: data.role,
      });

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        name: data.name,
        email: data.email,
        role: data.role,
      }).catch((errors) => {
        console.log("set doc", errors);
      });
    }
  };

  return (
    <div className="h-[100vh] grid grid-cols-6 ">
      <div className="col-span-2 p-3">
        <div className="rounded-2xl bg-gradient-to-b from-[#5371ff] to-[#5371fe] w-full relative h-full">
          <div className="absolute top-1/3 -translate-y-2/4 w-full p-10 ">
            <p className="text-white text-4xl w-[85%] leading-[40px] outfit-semibold tracking-wider">
              Find your home with us.
            </p>
            <p className="poppins-regular text-white text-sm   w-[60%]  mt-8 tracking-widest">
              {" "}
              Discover the world's best community of pg seekers and pg owners.
            </p>
          </div>
          <div className="absolute h-[250px] bottom-10 mx-10 p-10 rounded-2xl bg-[#4264e3]">
            <p className="text-white poppins-regular leading-[24px] tracking-wider">
              Simply unbelievable! I am really satisfied with my new pg.This is
              almost like my home and absolutely wonderfull.
            </p>
            <div className="mt-5 gap-x-3 flex items-center">
              <img className="w-12" alt="user" src={userIcon} />
              <div className="outfit-regular">
                <p className="text-white">viram choksi</p>
                <p className="text-gray-400">Pg seeker</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-auto col-span-4 p-10"
      >
        <div>
          <p className="outfit-semibold text-3xl">
            {isLogin ? "Sign in" : "Sign up"}
          </p>
          <div className="poppins-medium flex items-center gap-x-2 text-base text-gray-600 mt-2">
            {!isLogin ? "Already have an account ?" : "Do not have a account ?"}
            <div
              onClick={() => setIsLogin(!isLogin)}
              className="cursor-pointer text-[#5371ff]"
            >
              {!isLogin ? "log in" : "Create accout"}
            </div>
          </div>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-10 max-w-[50%]">
          {!isLogin ? (
            <p className="outfit-medium text-lg text-gray-600 mt-2 col-span-2">
              You are a ?
            </p>
          ) : null}
          {!isLogin ? (
            <div className="grid grid-cols-2 col-span-2 gap-x-10">
              <label
                htmlFor="owner"
                className="cursor-pointer flex gap-x-3 mt-2 w-full col-span-1 rounded-2xl  items-center  border px-3 py-2"
              >
                <input
                  {...register("role")}
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
                  {...register("role")}
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
          ) : null}

          {!isLogin && (
            <div className={`${!isLogin && "mt-6"} w-full col-span-2`}>
              <p className="outfit-medium text-lg text-gray-600">Name</p>
              <div className=" w-full h-[45px]">
                <input
                  {...register("name", {
                    required: "Please enter name",
                  })}
                  className="h-full mt-2 w-full px-3 border rounded-xl poppins-regular text-base focus:border-[#5371ff] outline-none"
                  placeholder="Enter your name"
                  type="text"
                />
              </div>
              <div className="mt-2">
                {errors.name && <ErrorMessage message={errors.name?.message} />}
              </div>
            </div>
          )}

          <div className={`${!isLogin && "mt-6"} w-full col-span-2`}>
            <p className="outfit-medium text-lg text-gray-600">Email</p>
            <input
              {...register("email", {
                required: "Please enter email",
                pattern: {
                  value:
                    /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Invalid email address",
                },
              })}
              className="h-[45px] w-full mt-2 px-3 border rounded-xl poppins-regular text-base focus:border-[#5371ff] outline-none"
              placeholder="Enter your email"
              type="text"
            />
          </div>
          {errors.email && <ErrorMessage message={errors.email?.message} />}
          <div className="mt-6  w-full col-span-2">
            <p className="outfit-medium text-lg text-gray-600">Password</p>
            <div className="relative w-full h-[45px]">
              <input
                {...register("password", {
                  required: "Please enter password",
                  pattern: {
                    value:
                      /((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))/,
                    message: "Password is not strong enough.",
                  },
                })}
                className="h-full mt-2 w-full px-3 border rounded-xl poppins-regular text-base focus:border-[#5371ff] outline-none"
                placeholder="Enter your password"
                type={value ? "text" : "password"}
              />
              <div
                onClick={toggle}
                className="absolute top-2/4 right-5 cursor-pointer -transalte-y-2/4"
              >
                {value ? <FiEye /> : <FiEyeOff />}
              </div>
            </div>
            <div className="mt-2">
              {errors.password && (
                <ErrorMessage message={errors.password?.message} />
              )}
            </div>
          </div>
          <button
            className={`mt-10 outfit-medium tracking-wider text-lg col-span-2 bg-gradient-to-r w-full from-[#5371ff] to-[#5371fe] text-white px-14 py-3 rounded-xl border ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit"
            // onClick={handleClick}
            // disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span className="ml-2">Loading...</span>
              </span>
            ) : isLogin ? (
              "Sign in"
            ) : (
              "Create account"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
