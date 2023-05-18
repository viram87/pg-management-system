import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { pgOne, threePeople, twoPeople } from "../assets/asset";
import { BsFillTelephoneForwardFill } from "react-icons/bs";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Seekers = ({ user }) => {
  const [userData, setUserData] = useState();
  const [allPgs, setAllPgs] = useState();

  const q = query(collection(db, "users"));

  const getAllPgs = async () => {
    const querySnapshot = await getDocs(q);
    // querySnapshot.forEach((doc) => {
    //   setAllPgs((prevState) => [...prevState, doc.data()]);
    // });
    console.log(querySnapshot);
    setAllPgs(querySnapshot.docs);
  };

  useEffect(() => {
    getAllPgs();
  }, []);

  console.log(allPgs, "dsad");
  const navigate = useNavigate();
  return (
    <div>
      {allPgs?.map((e) => {
        return (
          <div className="flex flex-col gap-y-5 px-5 ">
            {e.data().hostels.map((pgs, index) => {
              return (
                <Link
                  to={"/view"}
                  state={{ data: pgs }}
                  key={index}
                  className="flex cursor-pointer bg-white relative hover:shadow-2xl rounded-xl items-start p-5 justify-between  "
                >
                  <div
                    className={`absolute px-2  text-sm py-0.5 right-0 top-0 ${
                      pgs.role == "Girls" ? "bg-[#ffccd7]" : "bg-[#afeaef]"
                    }`}
                  >
                    {pgs.role == "Boys" ? "Boys" : "Girls"}
                  </div>
                  {/* <p>{index + 1}</p> */}
                  {console.log(pgs?.images[0], "images")}
                  <div>
                    <div className="flex gap-x-5">
                      <img
                        src={pgs?.images[0]}
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
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Seekers;
