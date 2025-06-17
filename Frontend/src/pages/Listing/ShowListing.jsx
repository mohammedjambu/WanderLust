// ShowListing.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ShowListing.css';

const ShowListing = ({ listing, currUser }) => {
  const navigate = useNavigate();
  const [reviewForm, setReviewForm] = useState({ rating: 1, comment: '' });

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewForm.comment) return; // Basic validation
    console.log('Review submitted:', reviewForm);
    // Add logic to submit review to your backend
    setReviewForm({ rating: 1, comment: '' });
  };

  const handleDeleteListing = (e) => {
    e.preventDefault();
    console.log('Delete listing:', listing._id);
    // Add logic to delete listing via API
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Delete review:', reviewId);
    // Add logic to delete review via API
  };

  return (
    <div className="show-listing-container">
      {/* Listing Title */}
      <div className="show-listing-title">
        {/* <h3>{listing.title}</h3> */}
      </div>

      {/* Listing Card */}
      <div className="show-listing-card">
        <img
          // src={listing.image.url}
          className="show-listing-img"
          alt="listing_image"
        />
        <div className="show-listing-body">
          <p className="show-listing-text">
            {/* <i>Owned By: {listing.owner.username}</i> */}
          </p>
          {/* <p className="show-listing-text">{listing.description}</p> */}
          <p className="show-listing-text">
            {/* ₹ {listing.price.toLocaleString('en-IN')} */}
          </p>
          {/* <p className="show-listing-text">{listing.location}</p> */}
          {/* <p className="show-listing-text">{listing.country}</p> */}
        </div>
      </div>

      {/* Edit/Delete Buttons (Visible to Owner) */}
      {currUser && listing.owner._id === currUser._id && (
        <div className="show-listing-actions">
          <button
            className="btn btn-dark edit-btn"
            onClick={() => navigate(`/listings/${listing._id}/edit`)}
          >
            Edit
          </button>
          <form onSubmit={handleDeleteListing}>
            <button type="submit" className="btn btn-dark delete-btn">
              Delete
            </button>
          </form>
        </div>
      )}

      {/* Review Section */}
      <div className="show-listing-reviews">
        {currUser && (
          <>
            <hr />
            <h4>Leave a Review</h4>
            <form
              onSubmit={handleReviewSubmit}
              className="review-form needs-validation"
            >
              <div className="form-group">
                <label htmlFor="rating" className="form-label">
                  Rating
                </label>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <React.Fragment key={value}>
                      <input
                        type="radio"
                        id={`rate-${value}`}
                        name="rating"
                        value={value}
                        checked={reviewForm.rating === value}
                        onChange={handleReviewChange}
                        required
                      />
                      <label htmlFor={`rate-${value}`} title={`${value} stars`}>
                        {value} star{value > 1 ? 's' : ''}
                      </label>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="comment"
                  id="comment"
                  rows="5"
                  className="form-textarea"
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  required
                />
                {reviewForm.comment === '' && (
                  <div className="invalid-feedback">
                    Please add some comments for review
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-outline-dark">
                Submit
              </button>
            </form>
            <hr />
          </>
        )}

        {/* Display Reviews */}
        
      </div>

      {/* Map Section */}
      <div className="show-listing-map">
        <h3>Where you'll be</h3>
        <div id="map" className="map-placeholder">
          {/* Placeholder for map - integrate with a map library like react-leaflet */}
          <p>Map will be displayed here</p>
        </div>
      </div>
    </div>
  );
};

export default ShowListing;