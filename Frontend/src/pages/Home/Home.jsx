// Home.jsx (Refactored)
import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';
import { MapPin, Heart } from 'lucide-react';

// BEST PRACTICE: Create a separate, reusable component for the listing card.
export const ListingCard = ({ listing, isWishlisted = false, onToggleWishlist = null, actions = null }) => {
  const location = [listing.location, listing.country].filter(Boolean).join(', ');

  const handleWishlistClick = (e) => {
    e.preventDefault(); // Stop the card's link from navigating
    e.stopPropagation();
    if (onToggleWishlist) {
      onToggleWishlist(listing._id);
    }
  };

  return (
    // We change the outer element from a Link to a div, so the action buttons can be separate.
    <div className="listing-card">
      <Link to={`/listings/${listing._id}`} className="listing-card-link">
       {onToggleWishlist && (
          <button
            onClick={handleWishlistClick}
            className={`wishlist-toggle-btn ${isWishlisted ? 'active' : ''}`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart size={20} />
          </button>
        )}
        <div className="listing-image-container">
          <img
            loading="lazy"
            src={listing.images[0].url || '/default-image.jpg'}
            alt={listing.title}
            className="listing-image"
          />
        </div>
        <div className="listing-body">
          <h3 className="listing-title" title={listing.title}>{listing.title}</h3>
          <p className="listing-location">
            <MapPin size={14} className="location-icon" />
            {location}
          </p>
          <p className="listing-price">
            <b>₹{listing.price.toLocaleString('en-IN')}</b>
            <span> / night</span>
          </p>
        </div>
      </Link>
      
      {/* ✅ NEW: Conditionally render the action buttons if they are passed in */}
      {actions && (
        <div className="listing-card-actions">
          {actions}
        </div>
      )}
    </div>
  );
};



// UX ENHANCEMENT: A skeleton loader component for a better loading experience.
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-body">
      <div className="skeleton-text long"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-text"></div>
    </div>
  </div>
);

const Home = () => {
  const { serverUrl } = useContext(authDataContext); 
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!serverUrl) return;

    const fetchListings = async () => {
      try {
        setLoading(true);
        // Use URLSearchParams for cleaner query string construction
        const params = new URLSearchParams();
        const search = searchParams.get("search");
        const category = searchParams.get("category");
        if (search) params.append("search", search);
        if (category) params.append("category", category);

        const url = `${serverUrl}/api/listings?${params.toString()}`;
        
        const response = await axios.get(url, { timeout: 15000 });
        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Could not load listings. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [serverUrl, searchParams]);

  const renderContent = () => {
    if (loading) {
      // Display 8 skeleton cards while loading
      return Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />);
    }
    
    if (error) {
      return <div className="status-container" role="alert">{error}</div>;
    }
    
    if (listings.length === 0) {
      return <div className="status-container"><p>No listings found for your search.</p></div>;
    }

    return listings.map((listing) => (
      <ListingCard key={listing._id} listing={listing} />
    ));
  }

  return (
    // ACCESSIBILITY: Use <main> for the primary content of the page
    <main className="listings-container">
      <div className="listings-grid">
        {renderContent()}
      </div>
    </main>
  );
};

export default Home;