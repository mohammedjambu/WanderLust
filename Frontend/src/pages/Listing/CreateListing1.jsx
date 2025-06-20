import React, { useState, useEffect } from "react";
import "./CreateListing1.css";
import { useNavigate } from "react-router-dom";

const CreateListing1 = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !location || !country || !price) {
      alert("Please fill in all the fields.");
      return;
    }

    const listingData = {
      title,
      description,
      price,
      location,
      country,
    };

    localStorage.setItem("createListingData", JSON.stringify(listingData));
    navigate("/createListing2");
  };

  return (
    <div className="listing-container">
      <h1 className="listing-title">Create a New Listing</h1>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="form-input" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" className="form-input" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input type="text" className="form-input" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-input" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>

        <button type="submit" className="next-button">Next</button>
      </form>
    </div>
  );
};

export default CreateListing1;