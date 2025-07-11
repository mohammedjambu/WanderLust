// src/pages/MyTrips/MyTrips.jsx

import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { authDataContext } from '../../context/AuthContext';
import './MyTrips.css'; // Import the new, dedicated CSS

// A helper function for pretty date formatting
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

// A dedicated card component for trips
const TripCard = ({ booking, onCancel }) => {
  const checkIn = new Date(booking.checkIn);
  const checkOut = new Date(booking.checkOut);
  
  // Calculate the duration in nights
  const duration = Math.round((checkOut - checkIn) / (1000 * 60 * 60 * 24));
  
  // Determine if the trip is in the past
  const isPast = checkOut < new Date();

  return (
    <div className={`trip-card ${isPast ? 'is-past' : ''}`}>
      <Link to={`/listings/${booking.listing._id}`}>
        <div className="trip-image-container">
          <img
            src={booking.listing.image?.url || '/default-image.jpg'}
            alt={booking.listing.title}
            className="trip-image"
          />
        </div>
      </Link>
      <div className="trip-info-body">
        <Link to={`/listings/${booking.listing._id}`} className="trip-title-link">
          <h3 className="trip-title">{booking.listing.title}</h3>
        </Link>
        <p className="trip-location">{booking.listing.location}, {booking.listing.country}</p>
        
        <div className="trip-details">
          <p><b>Check-in:</b> {formatDate(booking.checkIn)}</p>
          <p><b>Check-out:</b> {formatDate(booking.checkOut)}</p>
          <p><b>Duration:</b> {duration} {duration > 1 ? 'nights' : 'night'}</p>
        </div>
      </div>

      <div className="trip-card-footer">
        <p className="trip-total">Total: ₹{booking.totalPrice.toLocaleString('en-IN')}</p>
        <button
          onClick={() => onCancel(booking._id)}
          className="cancel-btn"
          disabled={isPast}
          title={isPast ? "Cannot cancel a past trip" : "Cancel this booking"}
        >
          {isPast ? 'Trip Completed' : 'Cancel Booking'}
        </button>
      </div>
    </div>
  );
};

// A skeleton loader for this specific page
const SkeletonTripCard = () => (
    <div className="trip-card skeleton-trip-card">
        <div className="trip-image-container"></div>
        <div className="trip-info-body">
            <div className="skeleton-text long"></div>
            <div className="skeleton-text short"></div>
            <br />
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
        </div>
        <div className="trip-card-footer">
            <div className="skeleton-text short"></div>
        </div>
    </div>
);

const MyTrips = () => {
  const { authUser, serverUrl } = useContext(authDataContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/bookings/mine`, { withCredentials: true });
        // Sort bookings: upcoming trips first, then past trips
        const sortedBookings = res.data.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));
        setBookings(sortedBookings);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [authUser, serverUrl, navigate]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.delete(`${serverUrl}/api/bookings/${bookingId}`, { withCredentials: true });
      toast.success("Booking cancelled successfully!");
      setBookings(bookings.filter(b => b._id !== bookingId));
    } catch (err) {
      console.error("Cancel error:", err);
      toast.error("Failed to cancel booking.");
    }
  };

  const renderContent = () => {
    if (loading) {
      return Array.from({ length: 3 }).map((_, i) => <SkeletonTripCard key={i} />);
    }
    if (bookings.length === 0) {
      return (
        <div className="status-container">
          <p>You have no trips booked. Let's find your next adventure!</p>
          <Link to="/">Explore Listings</Link>
        </div>
      );
    }
    return bookings.map((booking) => (
      <TripCard key={booking._id} booking={booking} onCancel={handleCancelBooking} />
    ));
  };

  return (
    <main className="my-trips-container">
      <div className="page-header">
        <h1 className="page-title">My Trips 🧳</h1>
      </div>
      <div className="trips-grid">
        {renderContent()}
      </div>
    </main>
  );
};

export default MyTrips;