import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EditListing.css";

const EditListing = ({ listing }) => {
  // State for text fields, initialized with the current listing data
  const [formData, setFormData] = useState({
    title: listing.title,
    description: listing.description,
    price: listing.price,
    location: listing.location,
    country: listing.country,
  });

  // State for the selected file
  const [selectedFile, setSelectedFile] = useState(null);
  // State for the file name display
  const [fileName, setFileName] = useState("No file selected.");

  const navigate = useNavigate();

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    } else {
      setSelectedFile(null);
      setFileName("No file selected.");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate saving the updated listing
    const updatedListing = {
      id: listing.id,
      ...formData,
      image: selectedFile
        ? { filename: selectedFile.name, url: URL.createObjectURL(selectedFile) } // Simulate a URL for preview
        : listing.image, // Keep the original image if no new file is selected
    };
    console.log("Updated listing:", updatedListing);

    // Redirect back to the listing detail page
    navigate(`/listings/${listing.id}`);
  };

  // Handle cancel action
  const handleCancel = () => {
    navigate(`/listings/${listing.id}`);
  };

  return (
    <div className="edit-listing-container">
      <h1>Edit Listing</h1>
      <form onSubmit={handleSubmit} className="edit-listing-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (₹ per night)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="1"
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
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
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Upload New Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleFileChange}
            className="file-input"
            accept="image/*" // Restrict to image files
          />
          <label htmlFor="image" className="file-label">
            Browse... <span>{fileName}</span>
          </label>
        </div>
        <div className="form-buttons">
          <button type="submit" className="btn btn-save">
            Save Changes
          </button>
          <button
            type="button"
            className="btn btn-cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditListing;