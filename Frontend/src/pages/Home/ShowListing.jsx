import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Share2,
  MapPin,
  Wifi,
  Car,
  ChefHat,
  Waves,
  PawPrint,
  Snowflake,
  Star,
  Users,
  Bed,
  Bath,
  Edit,
  Trash2
} from "lucide-react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Map, { Marker } from "react-map-gl"; // Corrected import
import "mapbox-gl/dist/mapbox-gl.css";
import { authDataContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, parseISO } from "date-fns";
import { Dialog } from "@headlessui/react"; // Modal UI
import { differenceInCalendarDays } from "date-fns";

const ShowListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    serverUrl,
    authUser,
    error: authError,
    loading: authLoading,
  } = useContext(authDataContext);
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

  const [listingData, setListingData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [unavailableRanges, setUnavailableRanges] = useState([]);
  const [bookedDates, setBookedDates] = useState([]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [hasBooked, setHasBooked] = useState(false);

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  const itemVariants1 = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  // Fetch listing data and wishlist status
     const fetchListingData = useCallback(async () => {
    setLoading(true); 
    try {
      // Fetch the main listing data from the backend
      const response = await axios.get(`${serverUrl}/api/listings/${id}`, {
        withCredentials: true,
      });
      const data = response.data;
      setListingData(data); // Update the state with the fetched data

      // Set up fallback images
      const fallback = [
        data.image?.url || "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&w=800&q=80",
      ];
      setAdditionalImages(
        data.images?.length > 0 ? data.images.map((i) => i.url) : fallback
      );

      // If the user is logged in, perform additional checks
      if (authUser && data._id) {
        // Check if the listing is in the user's wishlist
        const wishlistRes = await axios.get(`${serverUrl}/api/wishlist`, { withCredentials: true });
        setIsFavorited(wishlistRes.data.some((listing) => listing._id === data._id));
        
        // Check if the user has booked this listing before
        const bookingRes = await axios.get(`${serverUrl}/api/bookings/mine`, { withCredentials: true });
        setHasBooked(bookingRes.data.some((b) => b.listing._id === data._id));
      } else {
        // If no user, reset these states
        setIsFavorited(false);
        setHasBooked(false);
      }
    } catch (err) {
      // Handle any errors during the fetch
      setError("Failed to load listing data: " + err.message);
      setIsFavorited(false);
      setHasBooked(false);
    } finally {

      setLoading(false);
    }
  }, [serverUrl, id, authUser]);
    

  useEffect(() => {
    if (serverUrl && id) {
      fetchListingData();
    }
  }, [serverUrl, id, fetchListingData]);



  useEffect(() => {
    const fetchUnavailableDates = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/bookings/unavailable/${id}`
        );
        const ranges = res.data;

        const dates = ranges.flatMap((range) =>
          eachDayOfInterval({
            start: parseISO(range.checkIn),
            end: parseISO(range.checkOut),
          })
        );

        setBookedDates(dates);
      } catch (err) {
        console.error("Failed to fetch unavailable dates:", err);
      }
    };

    if (id) fetchUnavailableDates();
  }, [id, serverUrl]);

  // // Check if user has booked this listing before
  // const checkIfUserBooked = async (listingId) => {
  //   try {
  //     const res = await axios.get(`${serverUrl}/api/bookings/mine`, {
  //       withCredentials: true,
  //     });
  //     const booked = res.data.some((b) => b.listing._id === listingId);
  //     setHasBooked(booked);
  //   } catch (err) {
  //     console.error("Booking check failed:", err);
  //   }
  // };

  // Fetch coordinates after listing data loads
  
  
  useEffect(() => {
    if (!listingData?.location || !listingData?.country) return;

    const fetchCoordinates = async () => {
      try {
        const res = await fetch(
          `${serverUrl}/api/get-coordinates?location=${encodeURIComponent(
            listingData.location
          )}&country=${encodeURIComponent(listingData.country)}`
        );
        if (!res.ok) throw new Error("Failed to fetch coordinates");
        const data = await res.json();
        if (data.latitude && data.longitude) {
          setCoordinates({ lat: data.latitude, lng: data.longitude });
        } else {
          setMapError("Unable to find coordinates for this location");
        }
      } catch (err) {
        setMapError("Error fetching coordinates: " + err.message);
      }
    };

    fetchCoordinates();
  }, [serverUrl, listingData?.location, listingData?.country]);

  // Toggle favorite from backend
  const toggleWishlist = async () => {
    if (!authUser) {
      toast.error("Please log in to use your wishlist.");
      navigate("/login");
      return;
    }

    // This removes the dependency on the listingData object having the _id.
    if (!id) {
      toast.error("Listing ID is missing.");
      return;
    }

    // Optimistic UI update for a better user experience
    setIsFavorited(!isFavorited);

    try {
      const res = await axios.post(
        `${serverUrl}/api/wishlist/toggle/${id}`, // Use the ID from the URL
        {},
        { withCredentials: true }
      );
      if (res.data.added) {
        toast.success("Added to wishlist ❤️");
      } else if (res.data.removed) {
        toast.info("Removed from wishlist");
      }
    } catch (err) {
      toast.error("Could not update wishlist. Reverting change.");
      setIsFavorited(isFavorited); // Revert the UI state if the API call fails
      console.error(err);
    }
  };

  // Function to get amenity icon based on name
  const getAmenityIcon = (name) => {
    switch (name) {
      case "Free WiFi":
        return <Wifi className="w-6 h-6" />;
      case "Full Kitchen":
        return <ChefHat className="w-6 h-6" />;
      case "Private Pool":
        return <Waves className="w-6 h-6" />;
      case "Free Parking":
        return <Car className="w-6 h-6" />;
      case "Air Conditioning":
        return <Snowflake className="w-6 h-6" />;
      case "Pet Friendly":
        return <PawPrint className="w-6 h-6" />;
      default:
        return <Star className="w-6 h-6" />;
    }
  };

  const defaultOfferings = [
    {
      title: "Dedicated workspace",
      description: "Private room with fast wifi for focused work",
      icon: <Wifi className="w-6 h-6" />,
    },
    {
      title: "Self check-in",
      description: "Easy access with smart lock entry",
      icon: <Star className="w-6 h-6" />,
    },
    {
      title: "Free cancellation",
      description: "Full refund if canceled at least 5 days before check-in",
      icon: <Star className="w-6 h-6" />,
    },
  ];

  if (authLoading || loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (authError || error) {
    return (
      <div className="text-center py-8 text-red-500">{authError || error}</div>
    );
  }

  if (!listingData) {
    return <div className="text-center py-8">Listing not found.</div>;
  }

  const handleReserve = async () => {
    if (!checkIn || !checkOut || !guests) {
      toast.error("Please fill all booking details properly.");
      return;
    }

    try {
      console.log({
        listingId: id,
        checkIn,
        checkOut,
        guests,
      });

      await axios.post(
        `${serverUrl}/api/bookings`,
        {
          listingId: id,
          checkIn: checkIn?.toISOString(),
          checkOut: checkOut?.toISOString(),
          guests,
        },
        { withCredentials: true }
      );
      toast.success("Booking successful!");
    } catch (err) {
      toast.error("Failed to create booking. Please ensure you are logged in.");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${serverUrl}/api/listings/${id}`, {
        withCredentials: true,
      });
      toast.success("Listing deleted successfully!");
      navigate("/");
    } catch (err) {
      alert("Failed to delete listing. Please try again.");
      console.error(err);
    }
  };

  const handleEdit = () => {
    navigate(`/listings/${id}/edit`);
  };

// Price calculation 
  const nightsCount =
    checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;

  const listingPrice = listingData.price || 0;
  const cleaningFee = 75; // You can make these dynamic later if needed
  const serviceFee = 89;

  const subtotal = listingPrice * nightsCount;
  const total = nightsCount > 0 ? subtotal + cleaningFee + serviceFee : 0;


  // const calculateTotal = () => {
  //   if (!listingData || !checkIn || !checkOut) return 0;
  //   const nights = Math.ceil(
  //     (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
  //   );
  //   return nights > 0 ? listingData.price * nights + 75 + 89 : 0;
  // };

  const isOwner = authUser && listingData.owner?._id === authUser._id;


  const handleReviewSubmit = async () => {
    const url = editingReviewId
      ? `${serverUrl}/api/listings/${id}/reviews/${editingReviewId}`
      : `${serverUrl}/api/listings/${id}/reviews`;
    const method = editingReviewId ? "put" : "post";

    try {
      await axios[method](
        url,
        { rating: reviewRating, comment: reviewText },
        { withCredentials: true }
      );
      toast.success(
        `Review successfully ${editingReviewId ? "updated" : "posted"}!`
      );
      closeReviewModal();

      fetchListingData(); // Re-fetch data to show the new/updated review

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to submit review");
      console.error(err);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;
    try {
      await axios.delete(
        `${serverUrl}/api/listings/${id}/reviews/${reviewId}`,
        { withCredentials: true }
      );
      toast.success("Review deleted!");
      
      fetchListingData();

    } catch (err) {
      toast.error(err.response?.data?.error || "Failed to delete review");
      console.error(err);
    }
  };

  const openReviewModalForEdit = (review) => {
    setEditingReviewId(review._id);
    setReviewText(review.comment);
    setReviewRating(review.rating);
    setIsReviewModalOpen(true);
  };

  const openReviewModalForCreate = () => {
    setEditingReviewId(null);
    setReviewText("");
    setReviewRating(0);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setEditingReviewId(null);
    setReviewText("");
    setReviewRating(0);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div variants={itemVariants}>
          <div className="mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-semibold text-gray-900">
                {listingData.title}
              </h1>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleWishlist}
                  disabled={loading} // Disable while any data is loading
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    isFavorited
                      ? "border-red-500 bg-red-50 text-red-600"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Heart
                    className={`w-4 h-4 transition-all ${
                      isFavorited ? "fill-current" : ""
                    }`}
                  />
                  <span className="text-sm font-medium">
                    {isFavorited ? "Saved" : "Save"}
                  </span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Image Gallery */}
        <motion.div variants={itemVariants1} className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-96 grid grid-cols-4 gap-2">
            <div className="col-span-2 relative group">
              <motion.img
                src={additionalImages[0]}
                alt="Main property view"
                className="w-full h-full object-cover cursor-pointer transition-all duration-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImageIndex(0)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-2">
              <div className="relative group">
                <motion.img
                  src={additionalImages[1]}
                  alt="Property view 2"
                  className="w-full h-full object-cover cursor-pointer transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  onClick={() => setSelectedImageIndex(1)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
              </div>
              <div className="relative group">
                <motion.img
                  src={additionalImages[2]}
                  alt="Property view 3"
                  className="w-full h-full object-cover cursor-pointer transition-all duration-200 rounded-tr-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  onClick={() => setSelectedImageIndex(2)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
              </div>
              <div className="relative group">
                <motion.img
                  src={additionalImages[3]}
                  alt="Property view 4"
                  className="w-full h-full object-cover cursor-pointer transition-all duration-200"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  onClick={() => setSelectedImageIndex(3)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-200" />
              </div>
              <div className="relative group">
                <motion.img
                  src={additionalImages[4]}
                  alt="Property view 5"
                  className="w-full h-full object-cover cursor-pointer transition-all duration-200 rounded-br-xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  onClick={() => setSelectedImageIndex(4)}
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                <div className="absolute bottom-4 right-4">
                  <button
                    className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-900 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors shadow-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Show all photos clicked");
                    }}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                    <span>Show all photos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two-Column Grid for Property Details, Description, Offerings, Amenities, and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">
                    {listingData.category} hosted by{" "}
                    {listingData.owner?.username || listingData.owner?.name}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{listingData.propertyDetails.guests} guests</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4" />
                      <span>
                        {listingData.propertyDetails.bedrooms} bedrooms
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4" />
                      <span>
                        {listingData.propertyDetails.bathrooms} bathrooms
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm mt-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-red-500 text-red-500" />
                      <span className="font-medium">
                        {listingData.owner?.rating || "N/A"}
                      </span>
                      <span className="text-gray-600">
                        ({listingData.reviews?.length || 0} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-600">
                        {listingData.location}, {listingData.country}
                      </span>
                    </div>
                  </div>
                </div>
                <img
                  src={listingData.owner?.avatar || "/default-avatar.png"}
                  alt={listingData.owner?.username || listingData.owner?.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <hr className="border-gray-200" />
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <p className="text-gray-700 leading-relaxed">
                {listingData.description || "No description available."}
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defaultOfferings.map((offering, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-start gap-3 p-2"
                  >
                    {offering.icon}
                    <div>
                      <h4 className="text-gray-900 font-medium">
                        {offering.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {offering.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {listingData.amenities?.map((amenity, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 p-2"
                  >
                    {getAmenityIcon(amenity.name)}
                    <span className="text-gray-700">{amenity.name}</span>
                  </motion.div>
                )) || <p>No amenities listed.</p>}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-8">
              <div className="border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-semibold">
                    ₹{listingPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-600">night</span>
                </div>

                <div className="border border-gray-300 rounded-lg mb-4">
                  <div className="grid grid-cols-2">
                    <div className="p-3 border-r border-gray-300">
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Check-in
                      </label>
                      <DatePicker
                        selected={checkIn}
                        onChange={(date) => setCheckIn(date)}
                        minDate={new Date()}
                        excludeDates={bookedDates}
                        placeholderText="mm-dd-yyyy"
                        className="w-full border-0 outline-none text-sm"
                      />
                    </div>
                    <div className="p-3">
                      <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                        Check-out
                      </label>
                      <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date)}
                        minDate={checkIn || new Date()}
                        excludeDates={bookedDates}
                        placeholderText="mm-dd-yyyy"
                        className="w-full border-0 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div className="p-3 border-t border-gray-300">
                    <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                      Guests
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={listingData.propertyDetails?.guests || 10}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      className="w-full border-0 outline-none text-sm"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReserve}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors mb-4"
                >
                  Reserve
                </motion.button>

                {authUser && listingData?.owner?._id === authUser._id && (
                  <div className="flex gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEdit}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Edit Listing
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDelete}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
                    >
                      Delete Listing
                    </motion.button>
                  </div>
                )}

                <p className="text-center text-gray-600 text-sm mb-4">
                  You won't be charged yet
                </p>

                {nightsCount > 0 && (
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 underline">
                        ₹{listingPrice.toLocaleString("en-IN")} x {nightsCount}{" "}
                        nights
                      </span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>₹{cleaningFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}

                <hr className="border-gray-200 mb-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-red-500 text-red-500" />
              <h3 className="text-xl font-semibold">
                {listingData.owner?.rating || "New"} ·{" "}
                {listingData.reviews?.length || 0} reviews
              </h3>
            </div>
            {/* ✅ Show "Leave a Review" button only if user has booked and is NOT the owner */}
            {authUser && hasBooked && !isOwner && (
              <button
                onClick={openReviewModalForCreate}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              >
                Leave a Review
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {listingData.reviews?.map((review) => {
              // ✅ FIX: Defensive check. If a review or its author is null (due to deleted user),
              // skip rendering this review to prevent a crash.
              if (!review || !review.author) {
                return null;
              }

              return (
                <motion.div
                  key={review._id}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="relative border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {/* Now these lines are safe to access */}
                    <img
                      src={review.author.avatar || "/default-avatar.png"}
                      alt={review.author.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium">{review.author.username}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "long", year: "numeric" }
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm pr-16">
                    {review.comment}
                  </p>

                  {authUser?._id === review.author._id && (
                    <div className="absolute top-3 right-3 flex gap-3">
                      <button
                        onClick={() => openReviewModalForEdit(review)}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Review Modal */}
        <Dialog
          open={isReviewModalOpen}
          onClose={closeReviewModal}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="bg-white rounded-xl p-6 max-w-md w-full space-y-4 shadow-xl">
              <Dialog.Title className="text-xl font-semibold">
                {editingReviewId ? "Edit Your Review" : "Leave a Review"}
              </Dialog.Title>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`w-6 h-6 cursor-pointer ${
                      reviewRating >= star
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
              <textarea
                rows={4}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your thoughts here..."
                className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={closeReviewModal}
                  className="px-4 py-2 rounded-lg text-sm bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReviewSubmit}
                  disabled={!reviewText || reviewRating === 0}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition disabled:opacity-50"
                >
                  Submit
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>

        {/* Map section  */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Where you'll be</h3>
          <div
            className="map-container"
            style={{
              height: "400px",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {mapError ? (
              <p className="text-red-500">{mapError}</p>
            ) : !MAPBOX_TOKEN ? (
              <p className="text-red-500">Missing Mapbox Token</p>
            ) : coordinates ? (
              <Map
                initialViewState={{
                  latitude: coordinates.lat,
                  longitude: coordinates.lng,
                  zoom: 12,
                }}
                style={{ width: "100%", height: "100%" }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
              >
                <Marker latitude={coordinates.lat} longitude={coordinates.lng}>
                  <div
                    style={{
                      width: "25px",
                      height: "25px",
                      backgroundColor: "#e11d48",
                      border: "3px solid white",
                      borderRadius: "50% 50% 50% 0",
                      transform: "rotate(-45deg)",
                      boxShadow: "0 0 5px rgba(0,0,0,0.3)",
                      zIndex: 10,
                    }}
                  />
                </Marker>
              </Map>
            ) : (
              <p className="text-gray-500">Loading map...</p>
            )}
          </div>
          <p className="text-gray-600 mt-2">
            {listingData.location}, {listingData.country}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShowListing;
