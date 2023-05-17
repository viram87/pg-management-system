import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast } from "react-toastify";

const AddNew = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const { state } = useLocation();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    rent: "",
    db_sharing: "",
    tr_sharing: "",
    contact: "",
    role: "",
    location: "",
    deposit: "",
    time: "",
    notice: "",
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const [selectedCheckboxes, setSelectedCheckboxes] = useState({
    food: false,
    cleaning: false,
    wifi: false,
    ac: false,
    cooler: false,
    food: false,
    power_backup: false,
    wifi: false,
  });

  const [houseRules, setHouseRules] = useState({
    visitor: false,
    non_veg: false,
    opposite_gender: false,
    smoking: false,
    drinking: false,
    loud_music: false,
    party: false,
  });

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedCheckboxes((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [value]: !prevSelectedCheckboxes[value],
    }));
  };

  const handleRulesChange = (event) => {
    const { value } = event.target;
    setHouseRules((prevSelectedCheckboxes) => ({
      ...prevSelectedCheckboxes,
      [value]: !prevSelectedCheckboxes[value],
    }));
  };

  console.log(selectedCheckboxes, "checkboc");

  const submitHandler = async (event) => {
    setIsLoading(true);
    const images = [];
    event.preventDefault();
    let tmpArray = [];
    let data = (
      await getDoc(doc(db, "users", currentUser.uid || currentUser.data.uid))
    ).data();
    tmpArray = data.hostels || data.data.hostels;
    tmpArray.push(userData);
    data.hostels = tmpArray;

    for (const file of selectedFiles) {
      const fileName = file.name;
      const storageRef = ref(storage, `pg-images/${fileName}`); // Specify the storage path
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      images.push(downloadURL);
    }

    setImageUrls(images);

    try {
      await setDoc(doc(db, "users", currentUser.uid || currentUser.data.uid), {
        email: currentUser.email || currentUser.data.email,
        hostels: [
          ...(currentUser.hostels || currentUser.data.hostels),
          {
            contact: userData.contact,
            tr_sharing: parseInt(userData.tr_sharing),
            location: userData.location,
            db_sharing: parseInt(userData.db_sharing),
            rent: parseInt(userData.rent),
            role: userData.role,
            notice: parseInt(userData.notice),
            time: userData.time,
            deposit: parseInt(userData.deposit),
            amenities: selectedCheckboxes,
            houseRules: houseRules,
            images: images,
          },
        ],
        name: currentUser?.name || currentUser?.data?.name,
        role: currentUser?.role || currentUser?.data?.role,
        uid: currentUser.uid || currentUser.data.uid,
      });
      setIsLoading(false);

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
    } catch (error) {
      toast("Something went wrong");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setCurrentUser(state.state);
  }, [state]);

  // console.log(currentUser);

  const changeHandler = (event) => {
    if (
      event.target.name === "role" ||
      event.target.name === "location" ||
      event.target.name === "time"
    ) {
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

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  return (
    <div className="">
      <Header />
      <Link to="/home" className="w-fit px-5 py-2 flex gap-x-2 items-center">
        <BiArrowBack />
        <div className=" poppins-medium">Back</div>
      </Link>
      <div className="p-5 h-[calc(100vh-128px)]">
        <p className="poppins-medium text-xl">Add new paying guest</p>

        <form
          onSubmit={submitHandler}
          className="mt-5 flex justify-evenly  gap-y-5  items-center"
        >
          <div>
            <input
              required
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileSelect}
            />
            <div>
              <Slider
                className="w-[400px] flex gap-x-10"
                centerMode={true}
                {...settings}
              >
                {selectedFiles.map((file, index) => (
                  <div key={index}>
                    <img
                      src={URL.createObjectURL(file)}
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
            </div>
          </div>
          <div className="flex flex-col gap-y-5 max-h-[70vh] px-1 scroll  overflow-y-auto items-center">
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

            <div className="w-[500px] grid grid-cols-2 col-span-2 gap-x-10">
              <div>
                <p className="outfit-regular">Twin sharing rent</p>
                <input
                  type="text"
                  required
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
                  required
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

            <div className="flex w-[500px] justify-between">
              <div className="flex flex-col">
                <p className="outfit-regular">Amenities</p>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2 mt-2"
                    value="food"
                    checked={selectedCheckboxes.food}
                    onChange={handleCheckboxChange}
                  />
                  Breakfast, Lunch and Dinner
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="wifi"
                    checked={selectedCheckboxes?.wifi}
                    onChange={handleCheckboxChange}
                  />
                  Superfast WI-FI
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="laundry"
                    checked={selectedCheckboxes?.laundry}
                    onChange={handleCheckboxChange}
                  />
                  Laundry Machines
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="cleaning"
                    checked={selectedCheckboxes?.cleaning}
                    onChange={handleCheckboxChange}
                  />
                  Regular room cleaning
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="ac"
                    checked={selectedCheckboxes?.ac}
                    onChange={handleCheckboxChange}
                  />
                  AC rooms
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="power_backup"
                    checked={selectedCheckboxes?.power_backup}
                    onChange={handleCheckboxChange}
                  />
                  Power backup
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="cooler"
                    checked={selectedCheckboxes?.cooler}
                    onChange={handleCheckboxChange}
                  />
                  Water Cooler
                </label>
              </div>

              <div className="flex flex-col">
                <p className="outfit-regular">House rules</p>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2 mt-2"
                    value="visitor"
                    checked={houseRules.visitor}
                    onChange={handleRulesChange}
                  />
                  Visitor's entry
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="non_veg"
                    checked={houseRules?.non_veg}
                    onChange={handleRulesChange}
                  />
                  Non-Veg Food
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="opposite_gender"
                    checked={houseRules?.opposite_gender}
                    onChange={handleRulesChange}
                  />
                  Opposite Gender
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="smoking"
                    checked={houseRules?.smoking}
                    onChange={handleRulesChange}
                  />
                  Smoking
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="drinking"
                    checked={houseRules?.drinking}
                    onChange={handleRulesChange}
                  />
                  Drinking
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="loud_music"
                    checked={houseRules?.loud_music}
                    onChange={handleRulesChange}
                  />
                  Loud music
                </label>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    value="party"
                    checked={houseRules?.party}
                    onChange={handleRulesChange}
                  />
                  Party
                </label>
              </div>
            </div>

            <div className="w-[500px]">
              <p className="outfit-regular">Deposit</p>
              <input
                required
                type="text"
                placeholder="Enter deposit amount in INR "
                value={userData.deposit}
                maxLength={5}
                className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
                name="deposit"
                onChange={(e) => changeHandler(e)}
              />
            </div>

            <div className="w-[500px] grid grid-cols-2 col-span-2 gap-x-10">
              <div className="">
                <p className="outfit-regular">Notice Period</p>
                <input
                  required
                  type="text"
                  placeholder="In month"
                  value={userData.notice}
                  maxLength={2}
                  className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
                  name="notice"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
              <div className="">
                <p className="outfit-regular">Gate closing time</p>
                <input
                  type="time"
                  placeholder="HH:MM (optional)"
                  value={userData.time}
                  className="w-full h-[45px] mt-2 px-3 border rounded-xl border-black outline-none focus:border-[#5371ff]"
                  name="time"
                  onChange={(e) => changeHandler(e)}
                />
              </div>
            </div>

            <button
              className={`mt-10 outfit-medium tracking-wider text-lg col-span-2 bg-gradient-to-r w-full from-[#5371ff] to-[#5371fe] text-white px-14 py-3 rounded-xl border ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="submit"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                  <span className="ml-2">Loading...</span>
                </span>
              ) : (
                "submit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNew;
