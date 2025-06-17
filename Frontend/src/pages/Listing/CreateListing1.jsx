// CreateListing.js (remains the same as before)
import React from 'react';
import './CreateListing1.css';
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import CreateListing2 from './CreateListing2';

const CreateListing1 = () => {
    let navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      navigate("/CreateListing2");
    };

  return (
    <>
    {/* <Navbar /> */}
    <div className="listing-container">
        <h1 className='listing-title'>Create a New Listing</h1>
      <form className="listing-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" className="form-input" placeholder='Add a catchy title' />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea className="form-input form-textarea"></textarea>
        </div>

        <div className="form-group">
          <label htmlFor='image'>Image</label>
          <div className="file-input-wrapper">
            <input type="file" id="image" className="file-input" />
            <label htmlFor="image" className="file-label">
              Browse... <span>No file selected.</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="text" className="form-input" placeholder='1200' />
        </div>

        <div className="form-group">
          <label>Country</label>
          <input type="text" className="form-input" placeholder='India' />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input type="text" className="form-input" placeholder='Jaipur, Rajasthan' />
        </div>

        <button type="submit" className="next-button">Next</button>
      </form>
    </div>
    </>
  );
};

export default CreateListing1;