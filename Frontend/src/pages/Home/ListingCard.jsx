// src/components/ListingCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart, Edit, Trash2 } from 'lucide-react';

export const ListingCard = ({ listing, actions = null }) => {
  const location = [listing.location, listing.country].filter(Boolean).join(', ');

  return (
    <div className="listing-card">
      <Link to={`/listings/${listing._id}`} className="listing-card-link">
        {/* Wishlist button can be added here if needed */}
        <div className="listing-image-container">
          <img
            loading="lazy"
            src={listing.images[0]?.url || '/default-image.jpg'}
            alt={listing.title}
            className="listing-image"
          />
        </div>
        <div className="listing-body">
          <h3 className="listing-title" title={listing.title}>{listing.title}</h3>
          <p className="listing-location">
            <MapPin size={14} />
            {location}
          </p>
          <p className="listing-price">
            <b>₹{listing.price.toLocaleString('en-IN')}</b>
            <span> / night</span>
          </p>
        </div>
      </Link>
      
      {/* Conditionally render action buttons if they are passed as props */}
      {actions && (
        <div className="listing-card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};

// Example of how to define actions outside the component
export const getMyTripsActions = (listingId) => (
  <>
    <Link to={`/listings/${listingId}/edit`} className="action-btn edit">
      <Edit size={16} /> Edit
    </Link>
    <button onClick={() => alert(`Delete listing ${listingId}`)} className="action-btn delete">
      <Trash2 size={16} /> Delete
    </button>
  </>
);