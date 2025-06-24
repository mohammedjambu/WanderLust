import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateListing2.css';
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

const CreateListing2 = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/auth/check", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.loggedIn) {
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"));
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stored = JSON.parse(localStorage.getItem("createListingData"));
    if (!stored || images.length === 0 || !selectedOption) {
      alert("Please select category and upload images.");
      return;
    }

    const formData = new FormData();
    formData.append("title", stored.title);
    formData.append("description", stored.description);
    formData.append("price", stored.price);
    formData.append("location", stored.location);
    formData.append("country", stored.country);
    formData.append("category", selectedOption);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    // ✅ Correctly stringify to avoid "[object Object] is not valid JSON"
    formData.append("propertyDetails", JSON.stringify({ guests: 2, bedrooms: 1, bathrooms: 1 }));
    formData.append("amenities", JSON.stringify([{ name: "Wi-Fi", icon: "🌐" }]));

    try {
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const result = await res.json();
      console.log("✅ Listing created:", result);
      toast.success("Listing created successfully!");
      localStorage.removeItem("createListingData");
      navigate("/");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to create listing");
    }
  };

  return (
    <div className="listing-container">
      <form className="listing-form" onSubmit={handleSubmit}>
        <h2 className="listing-title">Select the type of place:</h2>

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

        <div className="form-group">
          <label htmlFor="images">Upload Images</label>
          <input
            type="file"
            className="form-input"
            id="images"
            accept="image/*"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            required
          />
        </div>

        <button type="submit" className="next-button" disabled={!selectedOption}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateListing2;
