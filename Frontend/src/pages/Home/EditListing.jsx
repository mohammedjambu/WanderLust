// ✅ EditListing.jsx — Now pre-fills all values directly instead of placeholders

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditListing.css";
import { toast } from "react-toastify";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    category: "",
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "Villa",
    "Farm House",
    "Pool House",
    "Rooms",
    "Flat",
    "PG",
    "Cabin",
    "Shops",
    "Rooms"
  ];

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/listings/${id}`);
        const data = await res.json();

        setFormData({
          title: data.title || "",
          description: data.description || "",
          price: data.price || "",
          location: data.location || "",
          country: data.country || "",
          category: data.category || "",
        });
        setExistingImages(data.images || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch listing", err);
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("price", formData.price);
    form.append("location", formData.location);
    form.append("country", formData.country);
    form.append("category", formData.category);

    for (let i = 0; i < images.length; i++) {
      form.append("images", images[i]);
    }

    form.append("propertyDetails", JSON.stringify({ guests: 2, bedrooms: 1, bathrooms: 1 }));
    form.append("amenities", JSON.stringify([{ name: "Wi-Fi", icon: "🌐" }]));

    try {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
        method: "PUT",
        credentials: "include",
        body: form,
      });

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error);
      }

      const result = await res.json();
      console.log("✅ Listing updated:", result);
      toast.success("Listing updated successfully!");
      navigate(`/listings/${id}`);
    } catch (err) {
      console.error("❌ Failed to update listing:", err);
      alert("Update failed. Please try again.");
    }
  };

  const handleCancel = () => navigate(`/listings/${id}`);

  if (loading) return <p>Loading listing data...</p>;

  return (
    <div className="edit-listing-container">
      <h1>Edit Listing</h1>
      <form onSubmit={handleSubmit} className="edit-listing-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹ per night)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="" disabled>Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="images">Upload New Images</label>
          <input
            type="file"
            name="images"
            onChange={handleFileChange}
            accept="image/*"
            multiple
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-save">Save Changes</button>
          <button type="button" className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditListing;