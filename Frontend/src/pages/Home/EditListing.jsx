import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { toast } from "react-toastify";
import ImageUpload from "../Listing/ImageUpload";
import "./EditListing.css";

import {
  Users, Bed, Bath, Wifi, ChefHat, Waves, PawPrint, Snowflake, WashingMachine,
  ThermometerSun, Flame, AirVent, Bike, Binoculars, FlameKindling,
  Castle, DoorOpen, Fence, Globe2, Backpack, Home, Landmark,
  Leaf, Mountain, ParkingCircle, Soup, Sprout, Store, Sun,
  Tent, Trees, Tv2, View, Wine, WavesLadder, HelpCircle, Star, ShieldCheck
} from "lucide-react";
import { MdBalcony } from "react-icons/md";
import { FaPeopleRoof } from "react-icons/fa6";
import { TbBeach } from "react-icons/tb";
import { backIn } from "framer-motion";

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      price: "",
      category: "",
      country: null,
      location: null,
      newImages: [], // This is now the ONLY field for images
      propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
      amenities: [],
    },
  });

  const selectedCountry = watch("country");

  // Fetch initial data (without setting existing images)
  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const [countriesRes, listingRes] = await Promise.all([
          fetch("https://restcountries.com/v3.1/all?fields=name,cca2"),
          fetch(`http://localhost:5000/api/listings/${id}`),
        ]);

        if (!countriesRes.ok) throw new Error("Failed to fetch countries");
        const countriesData = await countriesRes.json();
        const formattedCountries = countriesData
          .map((c) => ({
            value: c.name.common,
            label: c.name.common,
            code: c.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(formattedCountries);

        if (!listingRes.ok)
          throw new Error(
            (await listingRes.json()).error || "Failed to fetch listing"
          );
        const listingData = await listingRes.json();

        const fullCountryObject = formattedCountries.find(
          (c) => c.value === listingData.country
        );

        reset({
          title: listingData.title,
          description: listingData.description,
          price: listingData.price,
          category: listingData.category,
          country: fullCountryObject || null,
          location: {
            value: listingData.location,
            label: listingData.location,
          },
          propertyDetails: listingData.propertyDetails || {
            guests: 1,
            bedrooms: 1,
            bathrooms: 1,
          },
          amenities: listingData.amenities?.map(a => a.name) || [],
          newImages: [],
        });

        // ❌ No longer need to set existingImages state
      } catch (err) {
        toast.error(err.message);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [id, reset, navigate]);

  // City fetching logic (no changes needed)
  const fetchCities = (inputValue, callback) => {
    if (!selectedCountry?.code || inputValue.length < 2) return callback([]);
    const geoDbApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${inputValue}&countryIds=${selectedCountry.code}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_GEODB_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_GEODB_API_HOST,
      },
    };
    fetch(geoDbApiUrl, options)
      .then((res) => res.json())
      .then((apiResponse) => {
        const cityOptions = (apiResponse.data || []).map((city) => ({
          value: city.city,
          label: `${city.city}, ${city.region}`,
        }));
        callback(cityOptions);
      })
      .catch(() => callback([]));
  };
  const debouncedCityLoad = useMemo(
    () => debounce(fetchCities, 500),
    [selectedCountry]
  );


  // onSubmit function
  const onSubmit = useCallback(
    async (data) => {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("country", data.country.value);
      formData.append("location", data.location.value);
      formData.append("propertyDetails", JSON.stringify(data.propertyDetails));
      const amenitiesToSubmit = data.amenities.map(name => ({ name }));
      formData.append("amenities", JSON.stringify(amenitiesToSubmit));

      // Only append images if the user has selected new ones
      if (data.newImages && data.newImages.length > 0) {
        data.newImages.forEach((file) => formData.append("images", file));
      }

      // ❌ No longer need to append `deletedImages`.

      try {
        const res = await fetch(`http://localhost:5000/api/listings/${id}`, {
          method: "PUT",
          credentials: "include",
          body: formData,
        });
        if (!res.ok)
          throw new Error((await res.json()).error || "Update failed");

        toast.success("Listing updated successfully!");

        // Use cache-busting to ensure the next page shows fresh data
        const cacheBuster = new Date().getTime();
        navigate(`/listings/${id}?v=${cacheBuster}`);
      } catch (err) {
        toast.error(err.message);
      }
    },
    [id, navigate]
  ); // Dependency array is now simpler

  if (isLoading)
    return (
      <div className="edit-listing-container">
        <div className="form-wrapper">
          <p>Loading Editor...</p>
        </div>
      </div>
    );

    // Paste this block inside the EditListing component

const allAmenityNames = [
  "24/7 Security", "Air Conditioning", "Backwater View", "Balcony", "Ballroom", "BBQ Grill", 
  "Beach Access", "Bicycle Rental", "Campfire", "Canal View", "City Access", "City View", 
  "Cultural Immersion", "Entire Castle", "Entire Palace", "Fireplace", "Free Parking", 
  "Free WiFi", "Full Kitchen", "Ganges View", "Garden", "Garden View", "Great Hall", 
  "Guided Safari", "Heating", "Heritage Decor", "Hiking Trails", "Home-cooked Meals", 
  "Infinity Pool", "Lake View", "Laundry Service", "Luxury Tent", "Manicured Gardens", 
  "Market Access", "Mountain Views", "Ocean View", "Organic Farm", "Organic Garden", 
  "Outdoor Dining", "Pet Friendly", "Private Courtyard", "Private Fire Pit", 
  "Private Grounds", "Private Lake", "Private Patio", "Private Pool", "Riverside Tent", 
  "Rooftop Deck", "Rooftop Terrace", "Rooftop View", "Sea View", "Security", 
  "Shared Courtyard", "Shared Kitchen", "Ski Storage", "Smart TV", "Stargazing", 
  "Tatami Mats", "Tropical Garden", "TV", "Washer", "Wildlife Viewing", 
  "Wine Tasting", "Yoga Deck"
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

const formatOptionLabel = ({ name, icon }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {icon}
      <span>{name}</span>
    </div>
);

const customSelectStyles = {
  menu: (provided) => ({ ...provided, width: "580px", maxWidth: "90vw" }),
  menuList: (provided) => ({
    ...provided,
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4px",
    padding: "8px",
  }),
  control: (provided) => ({ ...provided, padding: "4px", }),
};


  return (
    <main className="edit-listing-container">
      <div className="form-wrapper">
        <h1 className="form-title">Edit Your Listing</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-fields">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                {...register("title", { required: "Title is required" })}
                className={`form-input ${errors.title ? "error-border" : ""}`}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                {...register("description", {
                  required: "Description is required",
                })}
                className={`form-textarea ${
                  errors.description ? "error-border" : ""
                }`}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="price">Price (₹ per night)</label>
              <input
                id="price"
                type="number"
                {...register("price", {
                  required: "Price is required",
                  min: 1,
                })}
                className={`form-input ${errors.price ? "error-border" : ""}`}
              />
            </div>

            {/* ++ FIX: ADDED PROPERTY DETAILS FIELDS */}
            <div className="property-details-grid">
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <input
                  id="guests"
                  type="number"
                  {...register("propertyDetails.guests", {
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                  })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bedrooms">Bedrooms</label>
                <input
                  id="bedrooms"
                  type="number"
                  {...register("propertyDetails.bedrooms", {
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                  })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="bathrooms">Bathrooms</label>
                <input
                  id="bathrooms"
                  type="number"
                  {...register("propertyDetails.bathrooms", {
                    required: true,
                    valueAsNumber: true,
                    min: 1,
                  })}
                  className="form-input"
                />
              </div>
            </div>

            {/* Add this section right after the Category dropdown */}
            <div className="form-group">
              <label htmlFor="amenities">Amenities</label>
              <Controller
                name="amenities"
                control={control}
                rules={{ required: "Please select at least one amenity." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    inputId="amenities"
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
                        selectedOptions?.map((option) => option.name) || []
                      )
                    }
                  />
                )}
              />
              {errors.amenities && (
                <p className="error-message">{errors.amenities.message}</p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="country">Country</label>
              <Controller
                name="country"
                control={control}
                rules={{ required: "Country is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    inputId="country"
                    options={countries}
                    classNamePrefix="react-select"
                    className={`react-select-container ${
                      errors.country ? "error-border" : ""
                    }`}
                  />
                )}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">City / Location</label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "City is required" }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    inputId="location"
                    key={selectedCountry?.code}
                    loadOptions={debouncedCityLoad}
                    isDisabled={!selectedCountry?.code}
                    placeholder="Type to search..."
                    cacheOptions
                    defaultOptions
                    classNamePrefix="react-select"
                    className={`react-select-container ${
                      errors.location ? "error-border" : ""
                    }`}
                  />
                )}
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                {...register("category", { required: "Category is required" })}
                className={`form-select ${
                  errors.category ? "error-border" : ""
                }`}
              >
                <option value="" disabled>
                  Select category
                </option>
                {[
                  "Villa",
                  "Farm House",
                  "Pool House",
                  "Rooms",
                  "Flat",
                  "PG",
                  "Cabins",
                  "Shops",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/*  SIMPLIFIED Image Upload */}
            <div className="form-group">
              <label>
                Upload Images (This will replace all current images)
              </label>
              <Controller
                name="newImages"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    value={field.value}
                    onFilesChange={field.onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="form-navigation">
            <button
              type="button"
              className="nav-button secondary"
              onClick={() => navigate(`/listings/${id}`)}
            >
              Cancel
            </button>
            <button type="submit" className="nav-button primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditListing;
