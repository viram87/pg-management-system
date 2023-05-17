import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import { AiOutlineWifi } from "react-icons/ai";
import { TbAirConditioning } from "react-icons/tb";
import { AiOutlineClear } from "react-icons/ai";
import { GiCooler } from "react-icons/gi";
import { ImPower } from "react-icons/im";
import { MdFastfood } from "react-icons/md";
import { BiArrowBack, BiDrink } from "react-icons/bi";
import { BsMusicPlayer } from "react-icons/bs";
import { TbMeat } from "react-icons/tb";
import { BsGenderAmbiguous } from "react-icons/bs";
import { GiPartyPopper } from "react-icons/gi";
import { MdSmokingRooms } from "react-icons/md";
import { BsPersonExclamation } from "react-icons/bs";
import Slider from "react-slick";

const ViewPg = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state?.data);

  const amenities = [
    { value: "AC", key: "ac", icon: <TbAirConditioning size={30} /> },
    {
      value: "Room cleaning",
      key: "cleaning",
      icon: <AiOutlineClear size={30} />,
    },
    { key: "cooler", value: "Water cooler", icon: <GiCooler size={30} /> },
    {
      key: "food",
      value: "Daily food",
      icon: <MdFastfood size={30} />,
    },
    { value: "Power backup", key: "power_backup", icon: <ImPower size={30} /> },
    { key: "wifi", value: "Superfast wifi", icon: <AiOutlineWifi size={30} /> },
  ];

  const houseRules = [
    {
      value: "Drinking",
      key: "drinking",
      icon: <BiDrink size={30} />,
    },
    {
      value: "Loud music",
      key: "loud_music",
      icon: <BsMusicPlayer size={30} />,
    },
    { key: "non_veg", value: "Non-Veg Food", icon: <TbMeat size={30} /> },
    {
      key: "opposite_gender",
      value: "Opposite Gender",
      icon: <BsGenderAmbiguous size={30} />,
    },
    { value: "Party", key: "party", icon: <GiPartyPopper size={30} /> },
    {
      key: "smoking",
      value: "Smoking",
      icon: <MdSmokingRooms size={30} />,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  console.log("data", data);

  return (
    <div className="bg-[#f1f1f1] h-[100vh]">
      <Header />
      <Link to="/home" className="w-fit px-5 py-2 flex gap-x-2 items-center">
        <BiArrowBack />
        <div className=" poppins-medium">Back</div>
      </Link>
      <div className="w-[90%] mx-auto mt-10 p-5 bg-white  rounded-lg grid grid-cols-3 gap-x-5">
        <div className="col-span-1">
          <Slider
            className="w-[400px] flex gap-x-10"
            centerMode={true}
            {...settings}
          >
            {data?.images?.map((file, index) => (
              <div key={index}>
                <img
                  src={file}
                  alt={`Image ${index}`}
                  style={{
                    width: "auto",
                    height: "200px",
                    maxHeight: "400px",
                  }}
                />
              </div>
            ))}
          </Slider>

          <div className="flex justify-around">
            <div className="mt-10">
              <p>Rent amount</p>
              <p> &#8377; {data?.rent}/-</p>
            </div>
            <div className="mt-10">
              <p>Deposit amount</p>
              <p> &#8377; {data?.deposit}/-</p>
            </div>
          </div>

          <div className="mt-10 flex justify-center items-center flex-col">
            <p>Contact owner </p>
            <a href={`tel:${data?.contact}`}>{data?.contact}</a>
          </div>

          <div className="bg-[#5371ff] px-2 w-fit h-fit mt-5 cursor-pointer py-2 text-white mx-auto rounded-lg">
            Book this pg
          </div>
        </div>
        <div className="w-full col-span-2 max-h-[70vh] overflow-y-auto">
          <div className="text-center grid grid-cols-3 gap-x-2">
            <div className="">
              <p>Deposit amount</p>
              <p> &#8377; {data?.deposit}/-</p>
            </div>
            <div className="">
              <p>Ac Rooms</p>
              <p>{data?.amenities?.ac ? "Available" : "Not available"}</p>
            </div>
            <div className="">
              <p>Power Backup</p>
              <p>
                {data?.amenities?.power_backup ? "Available" : "Not available"}
              </p>
            </div>
          </div>

          <div className="mt-10">
            <p className="outfit-medium text-lg ml-2">Common amenities</p>
            <div className="text-center col-span-2 mt-3 grid grid-cols-3  gap-2">
              {Object.keys(data?.amenities).map((datas, index) => {
                return data?.amenities[datas] ? (
                  <div className="justify-start col-span-1 flex items-center flex-col">
                    <div className="outfit-regular">
                      {data?.amenities[datas] &&
                        amenities.find((item) => item.key === datas)?.value}
                    </div>
                    <div className="mt-2">
                      {data?.amenities[datas] &&
                        amenities.find((item) => item.key === datas)?.icon}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className="mt-10">
            <p className="outfit-medium text-lg ml-2">House rules</p>
            <div className="text-center col-span-2 mt-3 grid grid-cols-3  gap-2">
              {Object.keys(data?.houseRules).map((datas, index) => {
                console.log(data?.houseRules[datas]);
                return data?.houseRules[datas] ? (
                  <div
                    key={index}
                    className={`col-span-1 flex items-center flex-col ${
                      data?.houseRules[datas] ? "true" : "hidden"
                    }`}
                  >
                    <div className="outfit-regular">
                      {data?.houseRules[datas] &&
                        houseRules.find((item) => item.key === datas)?.value}
                    </div>
                    <div className="mt-2">
                      {data?.houseRules[datas] &&
                        houseRules.find((item) => item.key === datas)?.icon}
                    </div>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPg;
