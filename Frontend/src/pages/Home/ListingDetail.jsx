import React from 'react';
import './ListingDetail.css';
import { Link, useParams } from 'react-router-dom';

const ListingDetail = ({ listing }) => {
    const { id } = useParams(); // Get the id from the URL to construct the edit link

  if (!listing || !listing.image) {
    return <div>Error: Listing data is missing or invalid.</div>;
  }
  

  return (
    <div className="listing-detail-container">
      {/* Image Section */}
      <h1 className="listing-detail-title">{listing.title}</h1>
      <div className="listing-detail-image-section">
        <img
          src={listing.image.url}
          alt={listing.title}
          className="listing-detail-image"
        />
      </div>

      {/* Main Content */}
      <div className="listing-detail-content">
        {/* Title and Location */}
        <div className="listing-detail-header">
          
          <p className="listing-detail-location">
            {listing.location}, {listing.country}
          </p>
        </div>

        {/* Description */}
        <div className="listing-detail-description">
          <h2>Description</h2>
          <p>{listing.description}</p>
        </div>
        

        {/* Price and Booking Section */}
        <div className="listing-detail-booking">
          <div className="listing-detail-price">
            <h2>₹ {listing.price.toLocaleString('en-IN')} / night</h2>

            <br></br>
             {/* Add Edit button */}
            <Link to={`/listings/${id}/edit`} className="btn btn-edit">
                Edit Listing
            </Link>
          </div>
          
          <div className="booking-form">
            <h3>Reserve Your Stay</h3>
            <form>
              <div className="form-group">
                <label htmlFor="check-in">Check-in</label>
                <input
                  type="date"
                  id="check-in"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="check-out">Check-out</label>
                <input
                  type="date"
                  id="check-out"
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <select id="guests" className="form-input" required>
                  <option value="1">1 guest</option>
                  <option value="2">2 guests</option>
                  <option value="3">3 guests</option>
                  <option value="4">4 guests</option>
                </select>
              </div>
              <button type="submit" className="btn btn-reserve">
                Reserve
              </button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default ListingDetail;