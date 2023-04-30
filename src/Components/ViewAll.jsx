import React, { useEffect, useState } from "react";
import {
  pgFive,
  pgFour,
  pgOne,
  pgThree,
  pgTwo,
  threePeople,
  twoPeople,
  verified,
} from "../assets/asset";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const dummyPg = [
  {
    sr: 1,
    contact: 123456789,
    rent: 10000,
    name: "viram's pg 1 ",
    forBoys: true,
    doubleSharing: 12000,
    image: [pgTwo],
    isVerified: false,
    tripleSharing: 10000,
    address: "Gota, Ahmedabad",
  },
  {
    sr: 2,
    contact: 123456789,
    rent: 10000,
    name: "viram's pg 2",
    forBoys: false,
    isVerified: false,
    doubleSharing: 12000,
    image: [pgThree],
    tripleSharing: 10000,
    address: "Thaltej, Ahmedabad",
  },
  {
    sr: 3,
    contact: 123456789,
    rent: 10000,
    isVerified: true,
    name: "viram's pg 3 ",
    forBoys: true,
    doubleSharing: 12000,
    image: [pgFour],
    tripleSharing: 10000,
    address: "Bodakdev, Ahmedabad",
  },
  {
    sr: 4,
    contact: 123456789,
    rent: 10000,
    name: "viram's pg 4 ",
    forBoys: true,
    doubleSharing: 12000,
    image: [pgFive],
    isVerified: false,
    tripleSharing: 10000,
    address: "Iscon, Ahmedabad",
  },
  {
    sr: 5,
    contact: 123456789,
    rent: 10000,
    name: "viram's pg 5 ",
    forBoys: false,
    isVerified: true,
    doubleSharing: 12000,
    image: [pgOne],
    tripleSharing: 10000,
    address: "Satelite, Ahmedabad",
  },
];

const ViewAll = ({ user }) => {

  const [pgData, setPgData] = useState([])

  const getData = async () => {
    const data = await getDoc(doc(db, "users", user.data.uid))
    setPgData(data.data().data.hostels)
  }

  useEffect(() => {
    getData()
    console.log('user', user.data.uid)
  }, [user])

  return (
    <div className="p-5">
      <div className="flex items-center gap-x-10">
        <p className="poppins-semibold text-lg">See all your PGs</p>
        <Link to="/add-new" state={{ state: user }} className="w-fit z-50 poppins-semibold px-3 cursor-pointer text-white py-1 rounded-lg bg-[#5371ff]">
          Add New
        </Link>
      </div>
      <div className="flex mt-5 h-fit">
        {/* <div className="w-[25%] border-r border-black"></div> */}
        <div className="h-[calc(100vh-160px)]  flex flex-col gap-y-5 overflow-x-hidden  overflow-scroll  w-full">
          {pgData.map((pgs, index) => {
            return (
              <div
                key={index}
                className="flex bg-white relative hover:shadow-2xl items-start rounded-xl p-5 justify-between  "
              >
                <div
                  className={`absolute px-2 text-sm py-0.5 right-0 top-0 ${pgs.role == "Girls" ? "bg-[#ffccd7]" : "bg-[#afeaef]"
                    }`}
                >
                  {pgs.role == "Boys" ? "Boys" : "Girls"}
                </div>
                {/* <p>{index + 1}</p> */}
                <div>
                  <div className="flex gap-x-5">
                    <img
                      src={pgOne}
                      className="w-[250px] h-[175px] rounded-xl object-cover "
                    />
                    <div>
                      <div className="flex items-start gap-x-5">
                        <p className="text-gray-500">
                          <span className="poppins-medium text-2xl text-red-600">
                            &#8377; {pgs.rent}/-
                          </span>{" "}
                          onwards
                        </p>
                        {/* {pgs.isVerified && (
                          <div className="flex items-center gap-x-2">
                            <img src={verified} className="w-6 h-6w-6" />
                            <p>verified</p>
                          </div>
                        )} */}
                      </div>

                      <div className="flex gap-x-10 mt-5">
                        <div
                          className="p-3 w-[250px] h-[85px] rounded-xl border
                  border-gray-400 hover:shadow-xl"
                        >
                          <div className="flex gap-x-2 justify-center">
                            <img src={twoPeople} className="w-5 h-5" />
                            <p className="poppins-medium text-sm">
                              Double sharing
                            </p>
                          </div>
                          <p className="text-center poppins-semibold mt-2 text-xl">
                            {" "}
                            &#8377; {pgs.db_sharing}/-
                          </p>
                        </div>
                        <div
                          className="p-3 w-[250px] h-[85px] rounded-xl border
                  border-gray-400 hover:shadow-xl"
                        >
                          <div className="flex gap-x-2 justify-center">
                            <img src={threePeople} className="w-5 h-5" />
                            <p className="poppins-medium text-sm">
                              Triple sharing
                            </p>
                          </div>
                          <p className="text-center poppins-semibold mt-2 text-xl">
                            {" "}
                            &#8377; {pgs.tr_sharing}/-
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-x-14 mt-3 items-center">
                        <p className="poppins-medium">
                          Locality : {pgs.location}
                        </p>
                        <p className="poppins-medium flex items-center gap-x-5">
                          <BsFillTelephoneForwardFill />
                          <a href={`tel:${pgs.contact}`}>{pgs.contact}</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
};

export default ViewAll;
