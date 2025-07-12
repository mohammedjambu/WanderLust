// src/pages/MyWishlist/MyWishlist.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../../context/AuthContext';


import { ListingCard, SkeletonCard } from '../Home/Home'; 
import '../Home/Home.css'; 

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
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/wishlist`, { withCredentials: true });
        setWishlist(res.data);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
        setError("Could not load your wishlist. Try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [authUser, serverUrl, navigate]);

  // ✅ NEW: Function to handle removing an item from the wishlist
  const handleRemoveFromWishlist = async (listingId) => {
    // Optimistic UI update: remove the item instantly from the view
    const originalWishlist = [...wishlist];
    setWishlist(prev => prev.filter(item => item._id !== listingId));

    try {
      await axios.post(`${serverUrl}/api/wishlist/toggle/${listingId}`, {}, { withCredentials: true });
      toast.info("Removed from wishlist");
    } catch (err) {
      // If the API call fails, revert the change and show an error
      toast.error("Failed to update wishlist. Please try again.");
      setWishlist(originalWishlist);
      console.error("Error toggling wishlist:", err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, index) => <SkeletonCard key={index} />);
    }
    
    if (error) {
      return <div className="status-container" role="alert">{error}</div>;
    }
    
    if (wishlist.length === 0) {
      return (
        <div className="status-container">
          <p>Your wishlist is empty. Start exploring to find places you love!</p>
          <Link to="/">Explore Listings</Link>
        </div>
      );
    }

    return wishlist.map((listing) => (
      <ListingCard
        key={listing._id}
        listing={listing}
        isWishlisted={true} // All items on this page are wishlisted
        onToggleWishlist={handleRemoveFromWishlist}
      />
    ));
  };

  return (
    <main className="listings-container">
      <div className="page-header">
        <h1 className="page-title">My Wishlist ❤️</h1>
      </div>
      <div className="listings-grid">
        {renderContent()}
      </div>
    </main>
  );
};

export default MyWishlist;