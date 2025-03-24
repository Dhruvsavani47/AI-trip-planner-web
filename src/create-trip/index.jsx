import React, { useState, useEffect, useRef } from "react";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "../constants/options";
import Button from './../components/Button';
import Dailog from './../components/Dailog';
import Toast from './../components/Toast';
import { chatSession } from './../services/AIModel';
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { MdOutlineDownloading } from "react-icons/md";
import { useNavigate } from "react-router";

const CreateTrip = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [manualSelection, setManualSelection] = useState(false);
  const dropdownRef = useRef(null);
  const [formData, setFormData] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData)
  }, [formData])

  useEffect(() => {
    if (manualSelection) return;

    const delayDebounceFn = setTimeout(() => {
      if (query.length >= 3) fetchLocations(query);
      else setSuggestions([]);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const fetchLocations = async (searchText) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchText}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleSelectLocation = (location) => {
    setQuery(location.display_name);
    setSelectedLocation(location);
    setSuggestions([]);
    setManualSelection(true);
    setTimeout(() => setManualSelection(false), 500);

    handleInputChange('Location', location);
  };

  useEffect(() => {
    if (selectedLocation) {
      console.log("Selected Location:", selectedLocation);
    }
  }, [selectedLocation]);

  const handleKeyDown = (e) => {
    if (suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === "Enter" && activeIndex !== -1) {
      handleSelectLocation(suggestions[activeIndex]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (!formData.Location || !formData.Budget || !formData.Traveler) {
      setToast({ show: true, message: "Please input all fields", type: "warning" });
      return;
    }
    if (formData?.noOfDays > 18) {
      setToast({
        show: true,
        message: "Number of trip days should be less than 18",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace("{location}", formData?.Location?.display_name)
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{Traveler}", formData?.Traveler)
      .replace("{Budget}", formData?.Budget)
      .replace("{totalDays}", formData?.noOfDays);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false);

    SaveAiTrip(result?.response?.text());
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrip", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false);

    navigate(`/view-trip/${docId}`);

    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

  const onClose = () => {
    setOpenDailog(false);
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      // console.log(codeResp)
      getUserProfile(codeResp);
    },
    onError: (error) => console.log(error)
  })

  const getUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Application/json",
      }
    }).then(response => {
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.data));
      setOpenDailog(false);
      onGenerateTrip();     
    })
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-90 px-5 mt-10 mb-20">
      <h2 className="font-extrabold text-[37px]">Tell us your travel preferences 🏕️🌴</h2>
      <p className="mt-3 text-[#384959] text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20">
        <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>

        <div className="relative font-medium" ref={dropdownRef}>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setManualSelection(false);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a location..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
          />
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 max-h-52 overflow-y-auto z-50">
              {suggestions.map((loc, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectLocation(loc)}
                  className={`px-4 py-2 cursor-pointer ${activeIndex === index ? "bg-blue-100" : "hover:bg-gray-100"
                    }`}
                >
                  {loc.display_name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">How many days are you planning your trip</h2>
        <input
          type="number"
          min="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm font-medium"
          placeholder="Ex. 3"
          onChange={(e) => {
            const value = Math.max(1, parseInt(e.target.value, 10) || "");
            handleInputChange('noOfDays', value);
          }}
        />
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">What is Your Budget ? </h2>

        <div className="grid grid-cols-3 gap-10 mt-5">
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('Budget', item.title)}
              className={`p-3 px-5 border rounded-lg hover:shadow-2xl cursor-pointer ${formData?.Budget == item.title && 'shadow-2xl border-3'}`}>
              <h2 className="text-[37px]">{item.icon}</h2>
              <h2 className="font-bold text-[18px] mt-2 px-2 text-[#384959]">{item.title}</h2>
              <h2 className="font-medium text-md px-2 text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure ? </h2>

        <div className="grid grid-cols-3 gap-10 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('Traveler', item.people)}
              className={`p-3 px-5 border rounded-lg hover:shadow-2xl cursor-pointer ${formData?.Traveler == item.people && 'shadow-2xl border-3'}`}>
              <h2 className="text-[37px]">{item.icon}</h2>
              <h2 className="font-bold text-[18px] mt-2 px-2 text-[#384959]">{item.title}</h2>
              <h2 className="font-medium text-md px-2 text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 justify-end flex">
        <button className='text-[#384959] text-md font-bold py-2 px-8 rounded-xl bg-[#BDDDFC] hover:bg-[#88BDF2] cursor-pointer' disabled={loading} onClick={onGenerateTrip}>{loading ? <MdOutlineDownloading className="h-7 w-7 animate-spin" /> : "Generate Trip"}</button>
      </div>

      <Dailog open={openDailog} onClose={onClose} onClick={login} />

      {toast.show && <Toast message={toast.message} type={toast.type} onClose={() => setToast({ show: false })} />}
    </div>
  );
};

export default CreateTrip;