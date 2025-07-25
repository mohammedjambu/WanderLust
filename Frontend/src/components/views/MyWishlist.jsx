import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { authDataContext } from "../../context/AuthContext";

import { ListingCard, SkeletonCard } from "./Home";
import "../../utils css/MyWishList.css";

const MyWishlist = () => {
  const { authUser, serverUrl, updateAuthUser } = useContext(authDataContext);
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${serverUrl}/api/wishlist`, {
          withCredentials: true,
        });
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

  const handleRemoveFromWishlist = async (listingId) => {
    const originalWishlist = [...wishlist];
    setWishlist((prev) => prev.filter((item) => item._id !== listingId));

    try {
      const response = await axios.post(
        `${serverUrl}/api/users/wishlist/toggle`,
        { listingId },
        { withCredentials: true }
      );
      updateAuthUser(response.data.user);
      toast.info("Removed from wishlist");
    } catch (err) {
      toast.error("Failed to update wishlist. Please try again.");
      setWishlist(originalWishlist);
      console.error("Error toggling wishlist:", err);
    }
  };

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 8 }).map((_, index) => (
        <SkeletonCard key={index} />
      ));
    }

    if (error) {
      return (
        <div className="status-container" role="alert">
          {error}
        </div>
      );
    }

    if (wishlist.length === 0) {
      return (
        <div className="status-container">
          <p>
            Your wishlist is empty. Start exploring to find places you love!
          </p>
          <Link to="/">Explore Listings</Link>
        </div>
      );
    }

    return wishlist.map((listing) => (
      <ListingCard
        key={listing._id}
        listing={listing}
        isWishlisted={true}
        onToggleWishlist={handleRemoveFromWishlist}
      />
    ));
  };

  return (
    <main className="my-wishlist-container">
      <div className="page-header">
        <h1 className="page-title">My Wishlist ❤️</h1>
      </div>
      <div className="listings-grid">{renderContent()}</div>
    </main>
  );
};

export default MyWishlist;
