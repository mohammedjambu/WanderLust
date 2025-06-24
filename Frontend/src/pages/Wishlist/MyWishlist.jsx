import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MyWishlist.css';
import axios from 'axios';
import { authDataContext } from '../../context/AuthContext';

const MyWishlist = () => {
  const { authUser, serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }

    const fetchWishlist = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/wishlist`, {
          withCredentials: true,
        });
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Could not load wishlist. Try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [authUser, serverUrl, navigate]);

  return (
    <div className="wishlist-wrapper">
      <h2 className="wishlist-title">My Wishlist ❤️</h2>

      {loading && <p>Loading wishlist...</p>}
      {error && <p className="error-text">{error}</p>}
      {!loading && wishlist.length === 0 && (
        <p className="no-wishlist-text">You haven’t favorited any listings yet.</p>
      )}

      <div className="wishlist-grid">
        {wishlist.map((listing) => (
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

export default MyWishlist;
