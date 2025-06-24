// pages/MyListings/MyListings.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyListing.css';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';

const MyListings = () => {
  const { authUser, serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }

    const fetchMyListings = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/listings/mine`, {
          withCredentials: true,
        });
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching your listings:", err);
        setError("Could not load your listings. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [authUser, serverUrl, navigate]);

  return (
    <div className="my-listings-wrapper">
      <h2 className="my-listings-title">My Listings</h2>

      {loading && <p>Loading your listings...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && listings.length === 0 && (
        <p className="no-listings-text">You haven't posted any listings yet.</p>
      )}

      <div className="my-listings-grid">
        {listings.map((listing) => (
          <Link
            key={listing._id}
            to={`/listings/${listing._id}`}
            className="listing-link"
          >
            <div className="listing-card">
              <img
                src={listing.image?.url}
                alt={listing.title}
                className="listing-img"
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
    </div>
  );
};

export default MyListings;
