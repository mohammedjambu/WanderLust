import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { authDataContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css"; // Import the new CSS file
import { User, Briefcase, MessageSquare, Home, Camera } from "lucide-react";
import { Dialog } from "@headlessui/react"; // For the modal
import { toast } from "react-toastify";

const Profile = () => {
  const { authUser, serverUrl, loading: authLoading, updateAuthUser } = useContext(authDataContext);
  const navigate = useNavigate();

  // State to hold the fetched data
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ State to manage the active tab
  const [activeTab, setActiveTab] = useState("about"); // 'about', 'bookings', 'reviews', 'listings'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    hometown: "",
    phone: "",
    bio: "",
  });

  // ✅ State to hold the selected avatar file and its preview URL
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    // Redirect if user is not logged in after auth check is complete
    if (!authLoading && !authUser) {
      navigate("/login");
      return;
    }
    if (authUser) {
      // Pre-fill form data when authUser is available
      setFormData({
        fullName: authUser.fullName || "",
        hometown: authUser.hometown || "",
        phone: authUser.phone || "",
      });

    // Fetch data only if the user is authenticated
    if (authUser) {
      const fetchProfileData = async () => {
        setLoading(true);
        try {
          const [bookingsRes, reviewsRes, listingsRes] = await Promise.all([
            axios.get(`${serverUrl}/api/bookings/mine`, { withCredentials: true }),
            axios.get(`${serverUrl}/api/reviews/mine`, { withCredentials: true }),
            axios.get(`${serverUrl}/api/listings/mine`, { withCredentials: true }),
          ]);

          setBookings(bookingsRes.data);
          setReviews(reviewsRes.data);
          setListings(listingsRes.data);
        } catch (err) {
          console.error("Error loading profile data:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchProfileData();
    }
    }
  }, [authUser, authLoading, serverUrl, navigate]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handler for when a user selects a new avatar image
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file)); // Create a temporary URL for preview
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    data.append("fullName", formData.fullName);
    data.append("hometown", formData.hometown);
    data.append("phone", formData.phone);
    data.append("bio", formData.bio);
    if (avatarFile) {
      data.append("avatar", avatarFile); // Only append the file if a new one was selected
    }

    try {
      const res = await axios.put(`${serverUrl}/api/auth/profile`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }, // Important for file uploads
      });
      updateAuthUser(res.data.user);
      toast.success("Profile updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to update profile.");
      console.error("Profile update error:", err);
    }
  };

  // Content for each tab
  const renderTabContent = () => {
    if (loading) return <p>Loading your data...</p>;

    switch (activeTab) {
      case "bookings":
        return (
          <div className="tab-content">
            <h3>My Trips</h3>
            {bookings.length === 0 ? (
              <p>You haven’t booked any trips yet.</p>
            ) : (
              <ul className="data-list">
                {bookings.map((b) => (
                  <li key={b._id} className="data-list-item">
                    <p className="data-list-item-title">{b.listing.title}</p>
                    <p className="data-list-item-subtitle">
                      {new Date(b.checkIn).toLocaleDateString()} → {new Date(b.checkOut).toLocaleDateString()} | {b.guests} guests
                    </p>
                    <p className="data-list-item-details">Total Paid: ₹{b.totalPrice.toLocaleString('en-IN')}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "reviews":
        return (
          <div className="tab-content">
            <h3>Reviews I've Written</h3>
            {reviews.length === 0 ? (
              <p>You haven’t left any reviews yet.</p>
            ) : (
              <ul className="data-list">
                {reviews.map((r) => (
                  <li key={r._id} className="data-list-item">
                    <p className="data-list-item-title">On: {r.listing?.title || "Deleted Listing"}</p>
                    <p className="data-list-item-subtitle text-yellow-600">Rating: {r.rating} ⭐</p>
                    <p className="data-list-item-details">"{r.comment}"</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "listings":
        return (
          <div className="tab-content">
            <h3>My Listings</h3>
            {listings.length === 0 ? (
              <p>You haven’t posted any listings yet.</p>
            ) : (
              <ul className="data-list">
                {listings.map((l) => (
                  <li key={l._id} className="data-list-item">
                    <p className="data-list-item-title">{l.title}</p>
                    <p className="data-list-item-subtitle">{l.category} | ₹{l.price.toLocaleString('en-IN')} / night</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case "about":
      default:
        return (
          <div className="tab-content">
            <div className="profile-header">
              <div className="user-info-card">
                <img src={authUser?.avatar || "/default-avatar.png"} alt="Avatar" className="user-avatar"/>
                <h2 className="user-name">{authUser?.fullName || authUser?.username}</h2>
                <p className="user-status">Guest</p>
              </div>
              <div className="complete-profile-card">
                <h3>Complete your profile</h3>
                <p>Your Wanderlust profile is an important part of every reservation. Create yours to help other hosts and guests get to know you.</p>
                <button className="get-started-btn" onClick={() => setIsModalOpen(true)}>Get started</button>
              </div>
            </div>
            {/* You can show a summary of reviews or other info here */}
          </div>
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
        <h2>Profile</h2>
        <nav className="profile-sidebar-nav">
          <button className={`sidebar-button ${activeTab === 'about' ? 'active' : ''}`} onClick={() => setActiveTab('about')}>
            <User /> About me
          </button>
          <button className={`sidebar-button ${activeTab === 'bookings' ? 'active' : ''}`} onClick={() => setActiveTab('bookings')}>
            <Briefcase /> Past trips
          </button>
           <button className={`sidebar-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
            <MessageSquare /> Reviews
          </button>
           <button className={`sidebar-button ${activeTab === 'listings' ? 'active' : ''}`} onClick={() => setActiveTab('listings')}>
            <MessageSquare /> My Listings
          </button>
        </nav>
      </aside>
      
      <main className="profile-content">
        {renderTabContent()}
      </main>
    </div>

    {/* ✅ ADD THIS MODAL COMPONENT */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} className="relative z-50 ">
        <div className="fixed inset-0 bg-black/30 " aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
            <Dialog.Title className="text-xl font-semibold">Complete Your Profile</Dialog.Title>
            <form onSubmit={handleFormSubmit} className="space-y-4">

               {/* Avatar Upload Field */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  <img src={avatarPreview || "/default-avatar.png"} alt="Avatar Preview" className="w-24 h-24 rounded-full object-cover border-2 border-gray-300 text-center"/>
                  <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full border shadow-sm cursor-pointer hover:bg-gray-100">
                    <Camera size={18} />
                    <input type="file" id="avatar-upload" name="avatar" accept="image/*" onChange={handleAvatarChange} className="hidden"/>
                  </label>
                </div>
              </div>

              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="hometown" className="block text-sm font-medium text-gray-700">Where you're from</label>
                <input type="text" name="hometown" id="hometown" value={formData.hometown} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleFormChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"/>
              </div>
              <div>
                <label htmlFor="bio">About Me (Intro)</label>
                <textarea name="bio" id="bio" rows="4" value={formData.bio} onChange={handleFormChange} placeholder="Tell us a little about yourself..." className="form-input-style"></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Save Changes</button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
};

export default Profile;