import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css"; // Your existing, correct CSS file
import {
  User,
  Briefcase,
  MessageSquare,
  Home,
  Camera,
  Star as StarIcon,
} from "lucide-react";
import { Dialog } from "@headlessui/react";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

// =================================================================
// Reusable Child Components for Each Tab
// This makes the main component much cleaner and easier to manage.
// =================================================================

const AboutTab = ({ authUser, onEditClick }) => (
  <div className="tab-content">
    <h3>Personal Information</h3>
    <div className="user-info-display">
      <div className="info-row">
        <span className="info-label">Full Name</span>
        <span className="info-value">
          {authUser?.fullName || "Not provided"}
        </span>
      </div>
      <div className="info-row">
        <span className="info-label">Username</span>
        <span className="info-value">{authUser?.username}</span>
      </div>
      <div className="info-row">
        <span className="info-label">Email</span>
        <span className="info-value">{authUser?.email}</span>
      </div>
      <div className="info-row">
        <span className="info-label">Phone</span>
        <span className="info-value">{authUser?.phone || "Not provided"}</span>
      </div>
      <div className="info-row">
        <span className="info-label">From</span>
        <span className="info-value">
          {authUser?.hometown || "Not provided"}
        </span>
      </div>
      <div className="info-row">
        <span className="info-label">About</span>
        <p
          className="info-value"
          style={{ maxWidth: "60%", textAlign: "right" }}
        >
          {authUser?.bio || "Not provided"}
        </p>
      </div>
      <div className="info-row">
        <span className="info-label">Update Your Info</span>
        <button onClick={onEditClick} className="info-value edit-btn">
          Edit Profile
        </button>
      </div>
    </div>
  </div>
);

const BookingsTab = ({ bookings }) => (
  <div className="tab-content">
    <h3>My Trips</h3>
    {bookings.length === 0 ? (
      <div className="empty-state">
        <p>You haven’t booked any trips yet. Time for a new adventure?</p>
        <Link to="/" className="action-link">
          Explore Listings
        </Link>
      </div>
    ) : (
      <div className="data-card-list">
        {bookings.map((b) => (
          <Link
            to={`/listings/${b.listing._id}`}
            key={b._id}
            className="data-card"
            style={{ textDecoration: "none" }}
          >
            <img
              src={b.listing.image?.url || "/default-image.jpg"}
              alt={b.listing.title}
              className="data-card-image"
            />
            <div className="data-card-content">
              <p className="data-card-title">{b.listing.title}</p>
              <p className="data-card-subtitle">
                {new Date(b.checkIn).toLocaleDateString()} →{" "}
                {new Date(b.checkOut).toLocaleDateString()}
              </p>
              <p className="data-card-details">
                Total Paid: ₹{b.totalPrice.toLocaleString("en-IN")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);

const ReviewsTab = ({ reviews }) => (
  <div className="tab-content">
    <h3>Reviews I've Written</h3>
    {reviews.length === 0 ? (
      <div className="empty-state">
        <p>You haven't reviewed any stays yet.</p>
      </div>
    ) : (
      <div className="data-card-list">
        {reviews.map((r) => (
          <div key={r._id} className="data-card">
            <img
              src={r.listing.image?.url || "/default-image.jpg"}
              alt={r.listing?.title}
              className="data-card-image"
            />
            <div className="data-card-content">
              <p className="data-card-subtitle">Your review for:</p>
              <p className="data-card-title">
                {r.listing?.title || "A deleted listing"}
              </p>
              <div className="data-card-rating">
                {[...Array(r.rating)].map((_, i) => (
                  <StarIcon key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="data-card-details">"{r.comment}"</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

const ListingsTab = ({ listings }) => (
  <div className="tab-content">
    <h3>My Properties</h3>
    {listings.length === 0 ? (
      <div className="empty-state">
        <p>You haven't created any listings yet. Ready to become a host?</p>
        <Link to="/createListing1" className="action-link">
          Host Your Place
        </Link>
      </div>
    ) : (
      <div className="data-card-list">
        {listings.map((l) => (
          <Link
            to={`/listings/${l._id}`}
            key={l._id}
            className="data-card"
            style={{ textDecoration: "none" }}
          >
            <img
              src={l.image?.url || "/default-image.jpg"}
              alt={l.title}
              className="data-card-image"
            />
            <div className="data-card-content">
              <p className="data-card-title">{l.title}</p>
              <p className="data-card-subtitle">
                {l.category} in {l.location}
              </p>
              <p className="data-card-details">
                ₹{l.price.toLocaleString("en-IN")} / night
              </p>
            </div>
          </Link>
        ))}
      </div>
    )}
  </div>
);

const Profile = () => {
  const {
    authUser,
    serverUrl,
    loading: authLoading,
    updateAuthUser,
  } = useContext(authDataContext);
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listings, setListings] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [activeTab, setActiveTab] = useState("about");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    hometown: "",
    phone: "",
    bio: "",
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (!authLoading && !authUser) {
      navigate("/login");
      return;
    }
    if (authUser) {
      setFormData({
        fullName: authUser.fullName || "",
        hometown: authUser.hometown || "",
        phone: authUser.phone || "",
        bio: authUser.bio || "",
      });
      setAvatarPreview(authUser.avatar);

      const fetchProfileData = async () => {
        setLoadingData(true);
        try {
          const [bookingsRes, reviewsRes, listingsRes] = await Promise.all([
            axios.get(`${serverUrl}/api/bookings/mine`, {
              withCredentials: true,
            }),
            axios.get(`${serverUrl}/api/reviews/mine`, {
              withCredentials: true,
            }),
            axios.get(`${serverUrl}/api/listings/mine`, {
              withCredentials: true,
            }),
          ]);
          setBookings(bookingsRes.data);
          setReviews(reviewsRes.data);
          setListings(listingsRes.data);
        } catch (err) {
          console.error("Error loading profile data:", err);
          toast.error("Could not load your profile data.");
        } finally {
          setLoadingData(false);
        }
      };
      fetchProfileData();
    }
  }, [authUser, authLoading, serverUrl, navigate]);

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("hometown", formData.hometown);
    data.append("phone", formData.phone || "");
    data.append("bio", formData.bio);
    if (avatarFile) data.append("avatar", avatarFile);

    try {
      const res = await axios.put(`${serverUrl}/api/auth/profile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      updateAuthUser(res.data.user);
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile.");
    }
  };

  const renderTabContent = () => {
    if (loadingData) return <p>Loading your data...</p>;
    switch (activeTab) {
      case "bookings":
        return <BookingsTab bookings={bookings} />;
      case "reviews":
        return <ReviewsTab reviews={reviews} />;
      case "listings":
        return <ListingsTab listings={listings} />;
      case "about":
      default:
        return (
          <AboutTab
            authUser={authUser}
            onEditClick={() => setIsModalOpen(true)}
          />
        );
    }
  };

  if (authLoading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  return (
    <>
      <div className="profile-container">
        <aside className="profile-sidebar">
          <h2>Account</h2>
          <nav className="profile-sidebar-nav">
            <button
              className={`sidebar-button ${
                activeTab === "about" ? "active" : ""
              }`}
              onClick={() => setActiveTab("about")}
            >
              <User /> Personal info
            </button>
            <button
              className={`sidebar-button ${
                activeTab === "bookings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("bookings")}
            >
              <Briefcase /> My Trips
            </button>
            <button
              className={`sidebar-button ${
                activeTab === "reviews" ? "active" : ""
              }`}
              onClick={() => setActiveTab("reviews")}
            >
              <MessageSquare /> My Reviews
            </button>
            <button
              className={`sidebar-button ${
                activeTab === "listings" ? "active" : ""
              }`}
              onClick={() => setActiveTab("listings")}
            >
              <Home /> My Listings
            </button>
          </nav>
        </aside>
        <main className="profile-content">{renderTabContent()}</main>
      </div>

      <Dialog
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-8 max-w-lg w-full shadow-xl">
            <Dialog.Title className="text-2xl font-semibold mb-4 text-center">
              Update Your Profile
            </Dialog.Title>

            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  src={avatarPreview || "/default-avatar.png"}
                  alt="Avatar Preview"
                  className="w-24 h-24 rounded-full object-cover border-2"
                />
                <label
                  htmlFor="avatar-upload"
                  className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border shadow-sm cursor-pointer hover:bg-gray-100"
                >
                  <Camera size={18} />
                </label>
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </div>
            </div>

            <form onSubmit={handleFormSubmit} className="modal-form">
              <div className="modal-form-row">
                <label className="modal-form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  className="modal-input"
                />
              </div>
              <div className="modal-form-row">
                <label className="modal-form-label">Where you're from</label>
                <input
                  type="text"
                  name="hometown"
                  value={formData.hometown}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  className="modal-input"
                />
              </div>
              <div className="modal-form-row">
                <label className="modal-form-label">Phone Number</label>
                <div className="modal-phone-input">
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={formData.phone}
                    onChange={(value) => handleFormChange("phone", value)}
                  />
                </div>
              </div>
              <div className="modal-form-row vertical">
                <label className="modal-form-label">About Me (Intro)</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={(e) =>
                    handleFormChange(e.target.name, e.target.value)
                  }
                  placeholder="Tell us a little about yourself..."
                  className="modal-textarea"
                />
              </div>

              <div className="modal-buttons">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="modal-btn secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="modal-btn primary">
                  Save Changes
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Profile;
