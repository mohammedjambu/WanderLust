import React, { useState, useEffect, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import {
  // Main Icons
  Heart,
  Share2,
  MapPin,
  Star,
  Users,
  Bed,
  Bath,
  Edit,
  Trash2,
  Calendar,
  ShieldCheck,
  Clock,
  Sparkles,
  Languages,
  MessageSquare,
  Briefcase,
  CalendarCheck,
  XCircle,
  Mail,
  Phone,
  Copy,
} from "lucide-react";

import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { authDataContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eachDayOfInterval, parseISO } from "date-fns";
import { Dialog } from "@headlessui/react";
import { differenceInCalendarDays } from "date-fns";
import "../../utils css/ShowListing.css";
import { getAmenityIcon } from "../utils/getAmenityIcon";

const getSafeAvatarUrl = (avatarString) => {
  if (!avatarString) return "/default-avatar.png";
  if (avatarString.startsWith("http")) return avatarString;
  const cloudName = import.meta.env.VITE_CLOUD_NAME || "dcwffxjz4";
  return `https://res.cloudinary.com/${cloudName}/image/upload/v1/${avatarString}`;
};

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
  const [isAmenitiesModalOpen, setIsAmenitiesModalOpen] = useState(false);
  const [coordinates, setCoordinates] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);
  const [guests, setGuests] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapError, setMapError] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(0);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [hasBooked, setHasBooked] = useState(false);
  const [isHostContactModalOpen, setIsHostContactModalOpen] = useState(false);

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
    setError(null);
    try {
      const listingRes = await axios.get(`${serverUrl}/api/listings/${id}`);
      const data = listingRes.data;
      setListingData(data);

      const fallbackImage =
        data.image?.url ||
        "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&w=800&q=80";
      const allImages =
        data.images?.length > 0
          ? data.images.map((i) => i.url)
          : [fallbackImage];
      setAdditionalImages(
        [
          ...allImages,
          fallbackImage,
          fallbackImage,
          fallbackImage,
          fallbackImage,
          fallbackImage,
        ].slice(0, 5)
      );

      const bookingsRes = await axios.get(
        `${serverUrl}/api/bookings/unavailable/${id}`
      );
      const dates = bookingsRes.data.flatMap((range) =>
        eachDayOfInterval({
          start: parseISO(range.checkIn),
          end: parseISO(range.checkOut),
        })
      );
      setBookedDates(dates);
    } catch (err) {
      setError("Failed to load listing data.");
      console.error("Public data fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [serverUrl, id]); // Dependencies for this function

  // Effect 1: Fetch public data on initial load.
  useEffect(() => {
    if (serverUrl && id) {
      fetchListingData();
    }
  }, [fetchListingData, serverUrl, id]);

  // Fetch wishlist status
  useEffect(() => {
    if (authLoading || !listingData) return;

    if (authUser) {
      const isFavorited = authUser.wishlist?.includes(listingData._id);
      setIsFavorited(!!isFavorited);

      const checkBookingStatus = async () => {
        try {
          const bookingRes = await axios.get(`${serverUrl}/api/bookings/mine`, {
            withCredentials: true,
          });
          setHasBooked(
            bookingRes.data.some((b) => b.listing?._id === listingData._id)
          );
        } catch (err) {
          console.error("Could not fetch user booking status:", err);
        }
      };
      checkBookingStatus();
    } else {
      setIsFavorited(false);
      setHasBooked(false);
    }
  }, [authUser, authLoading, listingData, serverUrl, id]);

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

    if (!id) {
      toast.error("Listing ID is missing.");
      return;
    }
    setIsFavorited(!isFavorited);

    try {
      const res = await axios.post(
        `${serverUrl}/api/wishlist/toggle/${id}`,
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
      setIsFavorited(isFavorited);
      console.error(err);
    }
  };

  const defaultOfferings = [
    {
      title: "Dedicated workspace",
      description: "Private room with fast wifi for focused work",
      icon: <Briefcase size={28} className="text-red-500 flex-shrink-0" />,
    },
    {
      title: "Self check-in",
      description: "Easy access with smart lock entry",
      icon: <CalendarCheck size={28} className="text-red-500 flex-shrink-0" />,
    },
    {
      title: "Free cancellation",
      description: "Full refund if canceled at least 5 days before check-in",
      icon: <XCircle size={28} className="text-red-500 flex-shrink-0" />,
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

  const CLEANING_FEE = 750;
  const SERVICE_FEE_RATE = 0.08;
  const TAX_RATE = 0.08;

  const listingPrice = listingData.price || 0;

  const subtotal = listingPrice * nightsCount;

  const serviceFee =
    nightsCount > 0 ? Math.round(subtotal * SERVICE_FEE_RATE) : 0;
  const taxes =
    nightsCount > 0
      ? Math.round((subtotal + CLEANING_FEE + serviceFee) * TAX_RATE)
      : 0;

  const total =
    nightsCount > 0 ? subtotal + CLEANING_FEE + serviceFee + taxes : 0;

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
      fetchListingData();
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

  const openHostContactModal = () => setIsHostContactModalOpen(true);
  const closeHostContactModal = () => setIsHostContactModalOpen(false);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-8 ">
        {/* Header Top section */}
        <motion.div variants={itemVariants}>
          <div className="mb-3">
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-3xl font-semibold text-gray-900">
                {listingData.title}
              </h1>
            </div>

            {/* Location */}
            <div className="flex justify-between items-start ">
              <div className="flex items-center gap-1 mt-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600">
                  {listingData.location}, {listingData.country}
                </span>
              </div>
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
                  disabled={loading}
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
          <div className="relative rounded-xl flex lg:grid lg:grid-cols-4 lg:grid-rows-2 gap-2 h-80 lg:h-96 mt-5 overflow-x-auto snap-x snap-mandatory">
            {/* --- IMAGE 1 --- */}
            <div className="relative w-full lg:col-span-2 lg:row-span-2 flex-shrink-0 snap-center group">
              <motion.img
                src={additionalImages[0]}
                alt="Main property view"
                className="w-full h-full object-cover cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedImageIndex(0)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            {/* --- IMAGE 2 --- */}
            <div className="relative w-full flex-shrink-0 snap-center group">
              <motion.img
                src={additionalImages[1]}
                alt="Property view 2"
                className="w-full h-full object-cover cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={() => setSelectedImageIndex(1)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>

            {/* --- IMAGE 3 --- */}
            <div className="relative w-full flex-shrink-0 snap-center group">
              <motion.img
                src={additionalImages[2]}
                alt="Property view 3"
                className="w-full h-full object-cover cursor-pointer lg:rounded-tr-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                onClick={() => setSelectedImageIndex(2)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>

            {/* --- IMAGE 4 --- */}
            <div className="relative w-full flex-shrink-0 snap-center group">
              <motion.img
                src={additionalImages[3]}
                alt="Property view 4"
                className="w-full h-full object-cover cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                onClick={() => setSelectedImageIndex(3)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>

            {/* --- IMAGE 5 --- */}
            <div className="relative w-full flex-shrink-0 snap-center group">
              <motion.img
                src={additionalImages[4]}
                alt="Property view 5"
                className="w-full h-full object-cover cursor-pointer lg:rounded-br-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                onClick={() => setSelectedImageIndex(4)}
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
          </div>
        </motion.div>

        {/* Main Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-12 gap-y-8 mb-8 ">
          <div className="lg:col-span-2">
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex flex-col mb-4">
                <div className="flex justify-between items-start w-full mb-2 gap-4">
                  <h2 className="text-2xl font-semibold mt-3">
                    {listingData.category} hosted by{" "}
                    {listingData.owner?.username || listingData.owner?.name}
                  </h2>
                  <img
                    src={getSafeAvatarUrl(listingData.owner.avatar)}
                    alt={listingData.owner?.username || listingData.owner?.name}
                    className="w-14 h-14 rounded-full object-cover flex-shrink-0"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-gray-600">
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

                  <div className="flex items-center gap-1 text-sm mt-3 sm:mt-0">
                    <Star className="w-5 h-5 fill-red-500 text-red-500" />
                    <span className="font-medium text-lg">
                      {listingData.reviews && listingData.reviews.length > 0 ? (
                        <>
                          {listingData.owner?.rating} ·{" "}
                          {listingData.reviews.length} reviews
                        </>
                      ) : (
                        <>New</>
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <hr className="border-gray-200" />
            </motion.div>

            {/* Listing Description */}
            <motion.div variants={itemVariants} className="mb-1">
              <p className="text-gray-700 leading-relaxed">
                {listingData.description || "No description available."}
              </p>
              <hr className="border-gray-200 mt-5" />
            </motion.div>

            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="py-10 border-b border-gray-200"
            >
              <h3 className="text-2xl font-semibold mb-6">
                What this place offers
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {defaultOfferings.map((offering, index) => (
                  <div
                    key={index}
                    className="flex flex-row items-start gap-4 bg-gray-50 p-5 rounded-xl"
                  >
                    {offering.icon}
                    <div>
                      <h4 className="font-semibold text-base text-gray-900">
                        {offering.title}
                      </h4>
                      <p className="text-gray-500 text-sm leading-snug mt-1">
                        {offering.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Amenities Section */}
            <motion.div
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
            >
              <h3 className="text-2xl font-semibold mb-6 mt-6">Amenities</h3>
              <div className="amenities-container grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {listingData.amenities && listingData.amenities.length > 0 ? (
                  listingData.amenities.slice(0, 6).map((amenity) => (
                    <div key={amenity.name} className="flex items-center gap-4">
                      {getAmenityIcon(amenity.name)}

                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 col-span-full">
                    The host hasn't listed any specific amenities for this
                    property.
                  </p>
                )}
              </div>

              {listingData.amenities && listingData.amenities.length > 6 && (
                <div className="mt-8">
                  <button
                    onClick={() => setIsAmenitiesModalOpen(true)}
                    className="px-6 py-3 border border-gray-800 rounded-lg font-semibold text-gray-800 hover:bg-gray-100 transition-colors"
                  >
                    Show all {listingData.amenities.length} amenities
                  </button>
                </div>
              )}
            </motion.div>

            {/* Modal for All Amenities */}
            <Dialog
              open={isAmenitiesModalOpen}
              onClose={() => setIsAmenitiesModalOpen(false)}
              className="relative z-50"
            >
              <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="bg-white rounded-xl p-6 max-w-lg w-full max-h-[80vh] flex flex-col shadow-xl">
                  <Dialog.Title className="text-xl font-semibold mb-4 flex-shrink-0">
                    All Amenities
                  </Dialog.Title>
                  <div className="overflow-y-auto flex-grow pr-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                      {listingData.amenities?.map((amenity) => (
                        <div
                          key={amenity.name}
                          className="flex items-center gap-4"
                        >
                          {getAmenityIcon(amenity.name)}
                          <span className="text-gray-800">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-shrink-0 pt-4 mt-4 border-t">
                    <button
                      onClick={() => setIsAmenitiesModalOpen(false)}
                      className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-black"
                    >
                      Done
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Dialog>
          </div>

          {/* Reserve Box Section */}
          <div className="lg:col-span-1">
            <motion.div variants={itemVariants} className="sticky top-24">
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

                {!isOwner && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleReserve}
                    className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-lg transition-colors mb-4"
                  >
                    Reserve
                  </motion.button>
                )}

                {authUser && listingData?.owner?._id === authUser._id && (
                  <div className="flex gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleEdit}
                      className="w-full bg-blue-500 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
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
                      <span className="text-gray-600 underline cursor-pointer">
                        ₹{listingPrice.toLocaleString("en-IN")} x {nightsCount}{" "}
                        nights
                      </span>
                      <span>₹{subtotal.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Cleaning fee</span>
                      <span>₹{CLEANING_FEE.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        Wanderlust service fee
                      </span>
                      <span>₹{serviceFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Taxes</span>
                      <span>₹{taxes.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <hr className="border-gray-200 mb-4" />

        {/* Reviews Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 fill-red-500 text-red-500" />
              <h3 className="text-xl font-semibold">
                {listingData.reviews && listingData.reviews.length > 0 ? (
                  <>
                    {listingData.owner?.rating} · {listingData.reviews.length}{" "}
                    reviews
                  </>
                ) : (
                  <>New · 0 reviews</>
                )}
              </h3>
            </div>
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
                    <img
                      src={getSafeAvatarUrl(review.author.avatar)}
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

                  {authUser && authUser._id === review.author._id && (
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
        <hr className="border-gray-200 mb-4" />

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
                      boxShadow: "0 0 5px rgba(0,0,0,0.5)",
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

        {/* Host Details Section */}
        <div className="host-profile-section-new">
          <div className="host-profile-header-new">
            {listingData.owner?.avatar ? (
              <img
                src={getSafeAvatarUrl(listingData.owner?.avatar)}
                alt={listingData.owner.name}
                className="host-avatar-new cursor-pointer"
                onClick={openHostContactModal}
              />
            ) : (
              <div className="host-avatar-fallback-new">
                {listingData.owner?.name?.charAt(0).toUpperCase() || "H"}
              </div>
            )}
            <div>
              <h2
                className="host-title-new cursor-pointer transition-all duration-300 group-hover:w-full"
                onClick={openHostContactModal}
              >
                Hosted by{" "}
                <span>{listingData.owner?.username || "our Host"}</span>
              </h2>
              <ul className="host-meta-new">
                <li className="meta-joined">
                  <Calendar size={14} className="icon" /> Joined:{" "}
                  {new Date(listingData.owner?.createdAt).toLocaleDateString(
                    "en-US",
                    { month: "long", year: "numeric" }
                  )}
                </li>
                <li className="meta-verified">
                  <ShieldCheck size={14} className="icon" /> Verified Host
                </li>
                <li className="meta-responds">
                  <Clock size={14} className="icon" /> Responds within an hour
                </li>
                <li className="meta-new">
                  <Sparkles size={14} className="icon" /> New host
                </li>
              </ul>
            </div>
          </div>

          <div className="host-stats-grid-new">
            <div className="stat-card-new map">
              <MapPin size={24} className="icon " />
              <div>
                <p className="label">Location</p>
                <p className="value">{listingData.owner?.hometown}</p>
              </div>
            </div>
            <div className="stat-card-new lang">
              <Languages size={24} className="icon" />
              <div>
                <p className="label">Languages</p>
                <p className="value">
                  {listingData.owner?.languages?.join(", ") || "English"}
                </p>
              </div>
            </div>
            <div className="stat-card-new msg">
              <MessageSquare size={24} className="icon" />
              <div>
                <p className="label">Response Rate</p>
                <p className="value">
                  {listingData.owner?.responseRate || "95%"}
                </p>
              </div>
            </div>
            <div className="stat-card-new user">
              <Users size={24} className="icon" />
              <div>
                <p className="label">Total Guests Hosted</p>
                <p className="value">
                  {listingData.owner?.totalGuests?.toLocaleString() || "120+"}
                </p>
              </div>
            </div>
          </div>

          <div className="about-host-new">
            <h3>About {listingData.owner?.name || "your host"}</h3>
            <p>
              {listingData.owner?.bio ||
                "This host prefers to keep an air of mystery, but they promise you a great stay!"}
            </p>
          </div>

          <div className="host-actions-new">
            <button
              className="btn primary text-[1.2rem]"
              onClick={openHostContactModal}
            >
              <MessageSquare size={18} /> Contact Host
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleWishlist}
              disabled={loading}
              className={`btn secondary ${
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
              <span className="text-[1.2rem] font-medium">
                {isFavorited ? "Saved" : "Save"}
              </span>
            </motion.button>
          </div>
        </div>

        {/* HOST CONTACT MODAL */}
        <Dialog
          open={isHostContactModalOpen}
          onClose={closeHostContactModal}
          className="relative z-50"
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4 mt-10">
            <Dialog.Panel className="mx-auto max-w-md w-full rounded-2xl bg-white p-6 shadow-xl">
              <div className="flex justify-between items-start">
                <Dialog.Title className="text-xl font-bold">
                  Contact Host
                </Dialog.Title>
                <button
                  onClick={closeHostContactModal}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>

              {/* Modal Header */}
              <div className="flex items-center gap-4 mt-4">
                <img
                  src={getSafeAvatarUrl(listingData.owner?.avatar)}
                  alt={listingData.owner?.username}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="text-2xl font-semibold">
                    {listingData.owner?.username}
                  </p>
                  <p className="text-sm text-gray-500">
                    {listingData.owner?.hometown}
                  </p>
                </div>
              </div>

              {/* Modal Body */}
              <div className="mt-6 space-y-4">
                {/* Email */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <Mail className="text-gray-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">
                        {listingData.owner?.email}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(listingData.owner?.email)
                    }
                    className="p-2 text-gray-500 hover:text-black"
                  >
                    <Copy size={18} />
                  </button>
                </div>

                {/* Phone */}
                <div className="flex items-center justify-between rounded-lg border border-gray-200 p-3">
                  <div className="flex items-center gap-3">
                    <Phone className="text-gray-600" size={20} />
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {listingData.owner?.phone || "+1 (555) 123-4567"}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      navigator.clipboard.writeText(
                        listingData.owner?.phone || "+1 (555) 123-4567"
                      )
                    }
                    className="p-2 text-gray-500 hover:text-black"
                  >
                    <Copy size={18} />
                  </button>
                </div>

                {/* Banners */}
                <div className="flex items-center gap-3 rounded-lg bg-red-50 p-3 text-sm text-red-800">
                  <MessageSquare size={20} />
                  <p>
                    <b>{listingData.owner?.username}</b> prefers to be contacted
                    via <b>Email</b>
                  </p>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-800">
                  <Clock size={20} />
                  <p>Usually responds within an hour</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6">
                <button
                  onClick={closeHostContactModal}
                  className="w-full rounded-lg bg-red-500 py-3 font-semibold text-white hover:bg-red-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </div>
    </motion.div>
  );
};

export default ShowListing;
