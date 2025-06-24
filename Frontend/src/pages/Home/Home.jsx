// Home.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import './Home.css';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';
import { MapPin } from 'lucide-react';

const Home = () => {
  const { serverUrl } = useContext(authDataContext); 
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  const category = searchParams.get("category");

  useEffect(() => {
    if (!serverUrl) return;

    const fetchListings = async () => {
      try {
        setLoading(true);
        let url = `${serverUrl}/api/listings`;
        const query = [];
        if (search) query.push(`search=${encodeURIComponent(search)}`);
        if (category) query.push(`category=${encodeURIComponent(category)}`);
        if (query.length > 0) url += `?${query.join("&")}`;

        const response = await axios.get(url, { timeout: 15000 });
        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("An unexpected error occurred while fetching listings.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [serverUrl, search, category]);

  if (loading) return <div className="loading-container"><p>Loading listings...</p></div>;
  if (error) return <div className="error-container"><p>{error}</p></div>;
  if (listings.length === 0) return <div className="loading-container"><p>No listings found.</p></div>;

  return (
    <div className="listings-grid">
      {listings.map((listing) => (
        <Link
          key={listing._id}
          to={`/listings/${listing._id}`}
          className="listing-link"
        >
          <div className="listing-card">
            <div className="listing-image-container">
              <img
                src={listing.image?.url || '/default-image.jpg'}
                alt={listing.title}
                className="listing-img"
              />
            </div>
            <div className="listing-body">
              <h3 className="listing-title">{listing.title}</h3>
              <p className="listing-location">
                <MapPin size={14} className="location-icon" />
                {listing.location}, {listing.country}
              </p>
              <p className="listing-price">
                <b>₹{listing.price.toLocaleString('en-IN')}</b>
                <span> / night per night</span>
              </p>
              <p className="listing-reviews">
                <span>★</span> {listing.reviews?.length || 0} reviews
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;