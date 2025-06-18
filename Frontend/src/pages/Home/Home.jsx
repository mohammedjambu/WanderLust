import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = () => {
    const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/listings`)
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  return (
    <>
    <Navbar />
    <div className="listings-grid">
      {listings.map((listing, index) => (
        <Link
          key={listing._id || listing.title} // Use _id if available, otherwise fallback to title
          to={`/listings/${listing._id}`} // Adjust based on your routing
          className="listing-link"
        >
          <div className="listing-card">
            <img
              src={listing.image?.url} alt={listing.title}
              className="listing-img"
              // alt="listing_image"
            />
            <div className="listing-overlay"></div>
            <div className="listing-body">
              <p className="listing-text">
                <b>{listing.title}</b>
                <br />
                {listing.location.toUpperCase()}, {listing.country.toUpperCase()}
                <br />
                ₹ {listing.price.toLocaleString('en-IN')} / night
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
    </>
  );
};

export default Home;