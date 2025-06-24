import React, { useState, useEffect, useContext } from 'react';
import { authDataContext } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MyTrips.css';
import { toast } from 'react-toastify';

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
        const res = await axios.get(`${serverUrl}/api/bookings/mine`, {
          withCredentials: true,
        });
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [authUser, serverUrl, navigate]);

  const handleCancelBooking = async (bookingId) => {
  const confirm = window.confirm("Are you sure you want to cancel this booking?");
  if (!confirm) return;

  try {
    await axios.delete(`${serverUrl}/api/bookings/${bookingId}`, {
      withCredentials: true,
    });

    toast.success("Booking cancelled");
    setBookings(bookings.filter(b => b._id !== bookingId));
  } catch (err) {
    console.error("Cancel error:", err);
    toast.error("Failed to cancel booking");
  }
};

  return (
    <div className="my-trips-wrapper">
      <h2 className="my-trips-title">My Trips 🧳</h2>

      {loading ? (
        <p>Loading your trips...</p>
      ) : bookings.length === 0 ? (
        <p className="no-trips-text">You haven't booked any listings yet.</p>
      ) : (
        <div className="trips-grid">
          {bookings.map((booking) => (
            <div key={booking._id} className="trip-card">
  <Link to={`/listings/${booking.listing._id}`}>
    <img
      src={booking.listing.image?.url}
      alt={booking.listing.title}
      className="trip-img"
    />
  </Link>

  <div className="trip-info">
    <h3>{booking.listing.title}</h3>
    <p>{booking.listing.location}, {booking.listing.country}</p>
    <p><b>Check-in:</b> {new Date(booking.checkIn).toLocaleDateString()}</p>
    <p><b>Check-out:</b> {new Date(booking.checkOut).toLocaleDateString()}</p>
    <p><b>Total:</b> ₹ {booking.totalPrice.toLocaleString('en-IN')}</p>

    <button
      onClick={() => handleCancelBooking(booking._id)}
      className="cancel-btn"
    >
      Cancel Booking
    </button>
  </div>
</div>

          ))}
        </div>
      )}
    </div>
  );
};

export default MyTrips;
