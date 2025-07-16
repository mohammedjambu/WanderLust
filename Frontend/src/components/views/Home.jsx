import React, { useState, useEffect, useContext } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../../utils css/Home.css";
import axios from "axios";
import { authDataContext } from "../../context/AuthContext";
import { MapPin } from "lucide-react";

export const ListingCard = ({ listing, actions = null }) => {
  const location = [listing.location, listing.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="listing-card">
      <Link to={`/listings/${listing._id}`} className="listing-card-link">
        <div className="listing-image-container">
          <img
            loading="lazy"
            src={listing.images[0].url || "/default-image.jpg"}
            alt={listing.title}
            className="listing-image"
          />
        </div>
        <div className="listing-body">
          <h3 className="listing-title" title={listing.title}>
            {listing.title}
          </h3>
          <p className="listing-location">
            <MapPin size={14} className="location-icon" />
            {location}
          </p>
          <p className="listing-price">
            <b>₹{listing.price.toLocaleString("en-IN")}</b>
            <span> / night</span>
          </p>
        </div>
      </Link>

      {actions && <div className="listing-card-actions">{actions}</div>}
    </div>
  );
};

// Skeleton loader
export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-image"></div>
    <div className="skeleton-body">
      <div className="skeleton-text long"></div>
      <div className="skeleton-text short"></div>
      <div className="skeleton-text"></div>
    </div>
  </div>
);

const Home = () => {
  const { serverUrl } = useContext(authDataContext);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!serverUrl) return;

    const fetchListings = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams(searchParams);
        const url = `${serverUrl}/api/listings?${params.toString()}`;

        const response = await axios.get(url, { timeout: 15000 });
        setListings(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Could not load listings. Please try refreshing the page.");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [serverUrl, searchParams]);

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

    if (listings.length === 0) {
      return (
        <div className="status-container">
          <p>No listings found for your search.</p>
        </div>
      );
    }

    return listings.map((listing) => (
      <ListingCard key={listing._id} listing={listing} />
    ));
  };

  return (
    <main className="listings-container">
      <div className="listings-grid">{renderContent()}</div>
    </main>
  );
};

export default Home;
