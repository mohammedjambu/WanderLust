import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { toast } from "react-toastify";
import { useCreateListing } from "../../context/CreateListingContext";
import "./CreateListing.css";
import ProgressTracker from "./ProgressTracker";
import ImageUpload from "./ImageUpload";

import {
  // Property Details Icons
  Users, Bed, Bath,
  // Amenity Icons
  Wifi, ChefHat, Waves, PawPrint, Snowflake, WashingMachine,
  ThermometerSun, Flame, AirVent, Bike, Binoculars, FlameKindling,
  Castle, DoorOpen, Fence, Globe2, Backpack, Home, Landmark,
  Leaf, Mountain, ParkingCircle, Soup, Sprout, Store, Sun,
  Tent, Trees, Tv2, View, Wine, WavesLadder, HelpCircle, Star, ShieldCheck,
} from "lucide-react";

// Import icons
import {
  GiFamilyHouse,
  GiWoodCabin,
  GiCampingTent,
  GiCastle,
} from "react-icons/gi";
import { FaTreeCity } from "react-icons/fa6";
import { FaUmbrellaBeach } from "react-icons/fa";
import { BiBuildingHouse } from "react-icons/bi";
import { IoBedOutline } from "react-icons/io5";
import { MdBedroomParent, MdOutlinePool, MdBalcony  } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { TbBeach } from "react-icons/tb";
import { FaPeopleRoof } from "react-icons/fa6";


// Category options with icons
const categoryOptions = [
  { name: "Villa", icon: <GiFamilyHouse /> },
  { name: "Farm House", icon: <FaTreeCity /> },
  { name: "Pool House", icon: <MdOutlinePool /> },
  { name: "Rooms", icon: <MdBedroomParent /> },
  { name: "Flat", icon: <BiBuildingHouse /> },
  { name: "PG", icon: <IoBedOutline /> },
  { name: "Cabins", icon: <GiWoodCabin /> },
  { name: "Shops", icon: <SiHomeassistantcommunitystore /> },
  { name: "Beach", icon: <FaUmbrellaBeach /> },
  { name: "Camping", icon: <GiCampingTent /> },
  { name: "Castles", icon: <GiCastle /> },
];

// Amenity options with icons
const allAmenityNames = [
  "24/7 Security", "Air Conditioning", "Backwater View", "Balcony", "Ballroom",
  "BBQ Grill", "Beach Access", "Bicycle Rental", "Campfire", "Canal View",
  "City Access", "City View", "Cultural Immersion", "Entire Castle", "Entire Palace",
  "Fireplace", "Free Parking", "Free WiFi", "Full Kitchen", "Ganges View",
  "Garden", "Garden View", "Great Hall", "Guided Safari", "Heating",
  "Heritage Decor", "Hiking Trails", "Home-cooked Meals", "Infinity Pool",
  "Lake View", "Laundry Service", "Luxury Tent", "Manicured Gardens",
  "Market Access", "Mountain Views", "Ocean View", "Organic Farm", "Organic Garden",
  "Outdoor Dining", "Pet Friendly", "Private Courtyard", "Private Fire Pit",
  "Private Grounds", "Private Lake", "Private Patio", "Private Pool",
  "Riverside Tent", "Rooftop Deck", "Rooftop Terrace", "Rooftop View",
  "Sea View", "Security", "Shared Courtyard", "Shared Kitchen", "Ski Storage",
  "Smart TV", "Stargazing", "Tatami Mats", "Tropical Garden", "TV", "Washer",
  "Wildlife Viewing", "Wine Tasting", "Yoga Deck"
];

const normalizeAmenityName = (name) => {
  if (!name) return "";
  return name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
};

const getAmenityIcon = (name) => {
  const iconClass = "w-6 h-6 text-gray-800 flex-shrink-0";
  const normalizedName = normalizeAmenityName(name);

  switch (normalizedName) {
    case "free-wifi": return <Wifi className={iconClass} />;
    case "free-parking": return <ParkingCircle className={iconClass} />;
    case "air-conditioning": return <AirVent className={iconClass} />;
    case "heating": return <ThermometerSun className={iconClass} />;
    case "pet-friendly": return <PawPrint className={iconClass} />;
    case "fireplace": return <Flame className={iconClass} />;
    case "washer": case "laundry-service": return <WashingMachine className={iconClass} />;
    case "tv": case "smart-tv": return <Tv2 className={iconClass} />;
    case "security": case "24/7-security": return <ShieldCheck className={iconClass} />;
    case "tatami-mats": return <Home className={iconClass} />;
    case "full-kitchen": case "shared-kitchen": return <ChefHat className={iconClass} />;
    case "wine-tasting": return <Wine className={iconClass} />;
    case "home-cooked-meals": return <Soup className={iconClass} />;
    case "outdoor-dining": return <Sun className={iconClass} />;
    case "bbq-grill": return <Flame className={iconClass} />;
    case "private-pool": case "infinity-pool": return <WavesLadder className={iconClass} />;
    case "sea-view": case "lake-view": case "backwater-view": case "ganges-view": case "canal-view": case "ocean-view": case "private-lake": return <Waves className={iconClass} />;
    case "rooftop-deck": case "rooftop-terrace": case "rooftop-view": return <FaPeopleRoof className={iconClass} />
    case "private-patio": case "balcony": return <MdBalcony className={iconClass} />;
    case "city-view": return <View className={iconClass} />;
    case "garden": case "tropical-garden": case "organic-garden": case "manicured-gardens": case "private-grounds": return <Trees className={iconClass} />;
    case "garden-view": return <Leaf className={iconClass} />;
    case "private-courtyard": case "shared-courtyard": return <Fence className={iconClass} />;
    case "mountain-views": return <Mountain className={iconClass} />;
    case "organic-farm": return <Sprout className={iconClass} />;
    case "beach-access": return <TbBeach className={iconClass} />;
    case "hiking-trails": return <Backpack className={iconClass} />;
    case "camping-tent": case "riverside-tent": case "luxury-tent": return <Tent className={iconClass} />;
    case "campfire": case "private-fire-pit": return <FlameKindling className={iconClass} />;
    case "wildlife-viewing": case "guided-safari": return <Binoculars className={iconClass} />;
    case "stargazing": return <Star className={iconClass} />;
    case "bicycle-rental": return <Bike className={iconClass} />;
    case "cultural-immersion": return <Globe2 className={iconClass} />;
    case "ski-storage": return <Snowflake className={iconClass} />;
    case "entire-castle": case "entire-palace": return <Castle className={iconClass} />;
    case "heritage-decor": return <Landmark className={iconClass} />;
    case "ballroom": case "great-hall": return <DoorOpen className={iconClass} />;
    case "market-access": case "city-access": return <Store className={iconClass} />;
    case "yoga-deck": return <Sprout className={iconClass} />;
    default: return <HelpCircle className={iconClass} />;
  }
};

const amenityOptions = allAmenityNames.map(name => ({
    name,
    icon: getAmenityIcon(name)
}));


const CreateListing2 = () => {
  const navigate = useNavigate();
  const { listingData, resetListingData } = useCreateListing();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: listingData.category || null,
      images: listingData.images || [],
      propertyDetails: listingData.propertyDetails || {
        guests: 1,
        bedrooms: 1,
        bathrooms: 1,
      },
      amenities: listingData.amenities || [],
    },
  });

  const selectedCategory = watch("category");
  const uploadedImages = watch("images");

  const handleFilesChange = useCallback(
    (files) => {
      setValue("images", files, { shouldValidate: true });
    },
    [setValue]
  );

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const formData = new FormData();

    formData.append('title', listingData.title);
    formData.append('description', listingData.description);
    formData.append('price', listingData.price);
    formData.append('country', listingData.country);
    formData.append('location', listingData.location);

    if (data.category) {
      formData.append("category", data.category);
    }

    formData.append("propertyDetails", JSON.stringify(data.propertyDetails));

    const amenitiesToSubmit = data.amenities.map(name => ({ name }));
    formData.append("amenities", JSON.stringify(amenitiesToSubmit));

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    try {
      const res = await fetch("http://localhost:5000/api/listings", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || errorData.error || "Failed to create listing");
      }

      toast.success( "Listing created successfully!");
      resetListingData();
      navigate("/");
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const propertyDetails = watch("propertyDetails");

const handleDetailChange = (field, amount) => {
    const currentValue = propertyDetails[field] || 1;
    const newValue = Math.max(1, currentValue + amount); 
    setValue(`propertyDetails.${field}`, newValue, { shouldValidate: true });
};

const formatOptionLabel = ({ name, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {icon}
      <span>{name}</span>
    </div>
);

const customSelectStyles = {
    menu: (provided) => ({
        ...provided,
        width: '580px',
        maxWidth: '90vw',
    }),
    menuList: (provided) => ({
        ...provided,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4px',
        padding: '8px',
    }),
    control: (provided) => ({
        ...provided,
        padding: '4px',
    }),
};

  return (
    <main className="create-listing-container">
      <div className="form-wrapper">
        <ProgressTracker currentStep={2} />
        <h1 className="form-title">Finish up & publish</h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-fields">
            <label className="text-[20px]">Select the type of place</label>
            <div className="form-group">
              <input
                type="hidden"
                {...register("category", {
                  required: "Please select a category",
                })}
              />
              <div className="options-grid">
                {categoryOptions.map((option) => (
                  <div
                    key={option.name}
                    className={`option-card ${
                      selectedCategory === option.name ? "selected" : ""
                    }`}
                    onClick={() =>
                      setValue("category", option.name, {
                        shouldValidate: true,
                      })
                    }
                  >
                    <span className="option-icon">{option.icon}</span>
                    <span className="option-name">{option.name}</span>
                  </div>
                ))}
              </div>
              {errors.category && (
                <p className="error-message">{errors.category.message}</p>
              )}
            </div>
            <hr className="bg-gray-200"></hr>

            {/* NEW Property Details Section */}
            <div className="form-group">
              <label className="form-label">
                Share some basics about your place
              </label>
              <div className="property-details-container-new">
                {/* Guests Counter */}
                <div className="property-detail-item-new">
                  <div className="flex items-center gap-3">
                    <Users className="property-detail-icon-new" />
                    <span className="font-medium text-gray-700">Guests</span>
                  </div>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => handleDetailChange("guests", -1)}
                      className="counter-btn"
                    >
                      -
                    </button>
                    <span className="counter-value">
                      {propertyDetails.guests}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDetailChange("guests", 1)}
                      className="counter-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bedrooms Counter */}
                <div className="property-detail-item-new">
                  <div className="flex items-center gap-3">
                    <Bed className="property-detail-icon-new" />
                    <span className="font-medium text-gray-700">Bedrooms</span>
                  </div>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => handleDetailChange("bedrooms", -1)}
                      className="counter-btn"
                    >
                      -
                    </button>
                    <span className="counter-value">
                      {propertyDetails.bedrooms}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDetailChange("bedrooms", 1)}
                      className="counter-btn"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Bathrooms Counter */}
                <div className="property-detail-item-new">
                  <div className="flex items-center gap-3">
                    <Bath className="property-detail-icon-new" />
                    <span className="font-medium text-gray-700">Bathrooms</span>
                  </div>
                  <div className="counter-controls">
                    <button
                      type="button"
                      onClick={() => handleDetailChange("bathrooms", -1)}
                      className="counter-btn"
                    >
                      -
                    </button>
                    <span className="counter-value">
                      {propertyDetails.bathrooms}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDetailChange("bathrooms", 1)}
                      className="counter-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              {errors.propertyDetails && (
                <p className="error-message">
                  All fields are required and must be at least 1.
                </p>
              )}
            </div>
            <hr className="form-divider" />

            {/* NEW Amenities Section */}
            <div className="form-group amenities-section">
              <label className="form-label">What amenities do you offer?</label>
              <Controller
                name="amenities"
                control={control}
                rules={{ required: "Please select at least one amenity." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={amenityOptions}
                    styles={customSelectStyles}
                    formatOptionLabel={formatOptionLabel}
                    getOptionValue={(option) => option.name}
                    getOptionLabel={(option) => option.name} 
                    placeholder="Select amenities..."
                    classNamePrefix="react-select"
                    value={amenityOptions.filter((option) =>
                      field.value?.includes(option.name)
                    )}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions.map((option) => option.name)
                      )
                    }
                  />
                )}
              />
              {errors.amenities && (
                <p className="error-message">{errors.amenities.message}</p>
              )}
            </div>
            <hr className="form-divider" />

            <label className="text-[18px] font-[400]">Upload Images</label>
            <ImageUpload
              value={uploadedImages}
              onFilesChange={handleFilesChange}
              error={errors.images}
            />
            <input
              type="file"
              style={{ display: "none" }}
              {...register("images", {
                validate: (value) =>
                  value.length > 0 || "Please upload at least one image",
              })}
            />
          </div>

          <div className="form-navigation">
            <button
              type="button"
              className="nav-button secondary"
              onClick={() => navigate("/createListing1")}
            >
              Back
            </button>
            <button
              type="submit"
              className="nav-button primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Listing"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListing2;
