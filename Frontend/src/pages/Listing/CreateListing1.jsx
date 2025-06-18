import React, { useState } from "react";
import "./CreateListing1.css";
import { useNavigate } from "react-router-dom";

const CreateListing1 = () => {
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  // const category = localStorage.getItem("selectedCategory");
  const [category, setCategory] = useState("Villa");
  const categories = ["Villa", "Farm House", "Pool House", "Rooms", "Flat", "PG", "Cabins", "Shops", "Trending"];

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("listing[title]", title);
    formData.append("listing[location]", location);
    formData.append("listing[country]", country);
    formData.append("listing[price]", price);
    formData.append("listing[description]", description);
    formData.append("listing[category]", category);
    if (image) {
      formData.append("image", image); // Match Multer's field name
    }

  try {
    const res = await fetch("http://localhost:5000/api/listings", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error("Failed to create listing\n" + errorText);
    }

    const data = await res.json();
    console.log("✅ Listing created:", data);
    navigate("/");

  } catch (err) {
    console.error("Error:", err.message);
  }
};


  return (
    <div className="listing-container">
      <h1 className="listing-title">Create a New Listing</h1>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            className="form-input"
            placeholder="Add a catchy title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            className="form-input form-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <div className="file-input-wrapper">
            <input
              type="file"
              id="image"
              className="file-input"
              onChange={(e) => setImage(e.target.files[0])}
              accept="image/*"
            />
            <label htmlFor="image" className="file-label">
              Browse... <span>{image ? image.name : "No file selected."}</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Category</label>
          <select
            className="form-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            className="form-input"
            placeholder="1200"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input
            type="text"
            className="form-input"
            placeholder="India"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            className="form-input"
            placeholder="Jaipur, Rajasthan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <button type="submit" className="next-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateListing1;
