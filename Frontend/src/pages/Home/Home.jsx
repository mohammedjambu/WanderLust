import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar';

const Home = ({ allListings }) => {
  return (
    <>
    <Navbar />
    <div className="listings-grid">
      {allListings.map((listing) => (
        <Link
          key={listing.id || listing.title} // Use _id if available, otherwise fallback to title
          to={`/listings/${listing.id || listing.title}`} // Adjust based on your routing
          className="listing-link"
        >
          <div className="listing-card">
            <img
              src={listing.image.url}
              className="listing-img"
              alt="listing_image"
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