// Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';

const Home = () => {
  // Get serverUrl from context. It's the single source of truth for the backend address.
  const { serverUrl } = useContext(authDataContext); 
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // The useEffect hook will now re-run if serverUrl changes from undefined to its actual value.
  useEffect(() => {
    // DO NOT run the fetch function if the serverUrl is not yet defined.
    if (!serverUrl) {
      return; 
    }

    const fetchListings = async () => {
      try {
        setLoading(true);
        // We no longer need a fallback here because we wait for serverUrl.
        const response = await axios.get(`${serverUrl}/api/listings`, {
          timeout: 15000, // A more generous timeout of 15 seconds.
        });
        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        // Provide a more specific error message based on the error type.
        if (err.code === 'ERR_NETWORK') {
          setError("Connection failed. Please ensure the backend server is running.");
        } else if (err.code === 'ECONNABORTED') {
          setError("The request timed out. The server might be too slow.");
        } else {
          setError("An unexpected error occurred while fetching listings.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [serverUrl]); // Dependency array ensures this runs when serverUrl is available.

  return (
    <>
      <Navbar />
      <div className="listings-grid">
        {loading && <p>Loading listings...</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
        {!loading && !error && listings.length === 0 && <p>No listings available.</p>}
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
    </>
  );
};

export default Home;