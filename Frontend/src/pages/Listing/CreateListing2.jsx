// ListingPage2.js
import React, { useState } from 'react';
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from 'react-icons/io5';

import './CreateListing2.css';
import { useNavigate } from 'react-router-dom';

const CreateListing2 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  let navigate = useNavigate();

  const options = [
    { name: 'Villa', icon: <GiFamilyHouse /> },
    { name: 'Farm House', icon: <FaTreeCity /> },
    { name: 'Pool House', icon: <MdOutlinePool /> },
    { name: 'Rooms', icon: <MdBedroomParent /> },
    { name: 'Flat', icon: <BiBuildingHouse /> },
    { name: 'PG', icon: <IoBedOutline /> },
    { name: 'Cabin', icon: <GiWoodCabin /> },
    { name: 'Shops', icon: <SiHomeassistantcommunitystore /> },
  ];

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (e) => {
  e.preventDefault();
  localStorage.setItem("selectedCategory", selectedOption); // store in localStorage
  navigate("/"); // or wherever your next form page is
};

  return (
    <div className="listing-container">
      <form className="listing-form" onSubmit={handleSubmit}>
        <h2 className="listing-title">Which of these best describes your place?</h2>
        <div className="options-grid">
          {options.map((option) => (
            <div
              key={option.name}
              className={`option-card ${selectedOption === option.name ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.name)}
            >
              <span className="option-icon">{option.icon}</span>
              <span className="option-name">{option.name}</span>
            </div>
          ))}
        </div>
        <button type="submit" className="next-button" disabled={!selectedOption}>
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateListing2;