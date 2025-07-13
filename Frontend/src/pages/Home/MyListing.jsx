// src/pages/MyListings/MyListings.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Edit, Trash2 } from 'lucide-react';
import { authDataContext } from '../../context/AuthContext';
import './MyListing.css'; // Import the new, dedicated CSS file

// ✅ A dedicated card component just for this page to prevent conflicts.
const MyListingCard = ({ listing, onDelete }) => {
  return (
    <div className="my-listing-card">
      <Link to={`/listings/${listing._id}`}>
        <div className="my-listing-image-container">
          <img
            src={listing.images[0].url || '/default-image.jpg'}
            alt={listing.title}
            className="my-listing-image"
          />
        </div>
      </Link>
      
      {/* This is the row that holds text and buttons */}
      <div className="my-listing-info-row">
        <div className="my-listing-body">
          <p className="my-listing-title" title={listing.title}>{listing.title}</p>
          <p className="my-listing-price">
            <b>₹{listing.price.toLocaleString('en-IN')}</b> / night
          </p>
        </div>
        
        <div className="my-listing-actions">
          <Link to={`/listings/${listing._id}/edit`} className="action-btn edit">
            <Edit size={14} />
          </Link>
          <button onClick={() => onDelete(listing._id)} className="action-btn delete">
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

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
        const res = await axios.get(`${serverUrl}/api/listings/mine`, { withCredentials: true });
        setListings(res.data);
      } catch (err) {
        console.error("Error fetching your listings:", err);
        setError("Could not load your listings. Try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [authUser, serverUrl, navigate]);

  const handleDelete = async (listingId) => {
    if (window.confirm("Are you sure you want to permanently delete this listing?")) {
      try {
        await axios.delete(`${serverUrl}/api/listings/${listingId}`, { withCredentials: true });
        setListings(prevListings => prevListings.filter(l => l._id !== listingId));
        toast.success("Listing deleted successfully!");
      } catch (err) {
        console.error("Deletion failed:", err);
        toast.error(err.response?.data?.error || "Failed to delete listing.");
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return <div className="status-container"><p>Loading your listings...</p></div>;
    }
    
    if (error) {
      return <div className="status-container" role="alert">{error}</div>;
    }
    
    if (listings.length === 0) {
      return (
        <div className="status-container">
          <p>You haven't created any listings yet.</p>
        </div>
      );
    }

    return listings.map((listing) => (
      <MyListingCard
        key={listing._id}
        listing={listing}
        onDelete={handleDelete}
      />
    ));
  };

  return (
    <main className="my-listings-container">
      <div className="page-header">
        <h1 className="page-title">My Listings</h1>
        {/* <Link to="/createListing1" className="action-btn-new">Create New Listing</Link> */}
      </div>
      <div className="my-listings-grid">
        {renderContent()}
      </div>
    </main>
  );
};

export default MyListings;