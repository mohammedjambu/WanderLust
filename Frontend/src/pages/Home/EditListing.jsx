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
  Users,
  Bed,
  Bath,
  Wifi,
  ChefHat,
  Waves,
  PawPrint,
  Snowflake,
  WashingMachine,
  ThermometerSun,
  AirVent,
  Bike,
  Binoculars,
  FlameKindling,
  Castle,
  Globe2,
  Mountain,
  ParkingCircle,
  Soup,
  Sprout,
  Store,
  Tent,
  Trees,
  Tv2,
  Wine,
  WavesLadder,
  HelpCircle,
  Star,
  ShieldCheck,
} from "lucide-react";
import {
  MdBalcony,
  MdOutlineFireplace,
  MdOutlineHiking,
  MdOutlineBrunchDining,
  MdOutlinePool,
} from "react-icons/md";
import { FaPeopleRoof, FaTent } from "react-icons/fa6";
import { TbBeach, TbGrill, TbToolsKitchen2 } from "react-icons/tb";
import { GiIndianPalace, GiCircleForest } from "react-icons/gi";

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
      newImages: [],
      propertyDetails: { guests: 1, bedrooms: 1, bathrooms: 1 },
      amenities: [],
    },
  });

  const selectedCountry = watch("country");

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
          amenities: listingData.amenities?.map((a) => a.name) || [],
          newImages: [],
        });
      } catch (err) {
        toast.error(err.message);
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
  }, [id, reset, navigate]);

  // City fetching
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
      const amenitiesToSubmit = data.amenities.map((name) => ({ name }));
      formData.append("amenities", JSON.stringify(amenitiesToSubmit));

      if (data.newImages && data.newImages.length > 0) {
        data.newImages.forEach((file) => formData.append("images", file));
      }

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
  );

  if (isLoading)
    return (
      <div className="edit-listing-container">
        <div className="form-wrapper">
          <p>Loading Editor...</p>
        </div>
      </div>
    );

  const allAmenityNames = [
    "Free WiFi",
    "24/7 Security",
    "Air Conditioning",
    "Balcony",
    "BBQ Grill",
    "Beach Access",
    "Bicycle Rental",
    "Campfire",
    "City Access",
    "Cultural Immersion",
    "Entire Castle",
    "Entire Palace",
    "Fireplace",
    "Free Parking",
    "Full Kitchen",
    "Garden",
    "Guided Safari",
    "Heating",
    "Hiking Trails",
    "Home-cooked Meals",
    "Infinity Pool",
    "Lake View",
    "Laundry Service",
    "Luxury Tent",
    "Mountain Views",
    "Organic Farm",
    "Outdoor Dining",
    "Pet Friendly",
    "Private Pool",
    "Rooftop View",
    "Shared Kitchen",
    "Ski Storage",
    "Smart TV",
    "Stargazing",
    "Wildlife Viewing",
    "Wine Tasting",
  ];

  const normalizeAmenityName = (name) => {
    if (!name) return "";
    return name.toLowerCase().replace(/ /g, "-").replace(/'/g, "");
  };

  const getAmenityIcon = (name) => {
    const iconClass = "w-6 h-6 text-gray-800 flex-shrink-0";
    const normalizedName = normalizeAmenityName(name);
    switch (normalizedName) {
      case "free-wifi":
        return <Wifi className={iconClass} />;
      case "free-parking":
        return <ParkingCircle className={iconClass} />;
      case "air-conditioning":
        return <AirVent className={iconClass} />;
      case "heating":
        return <ThermometerSun className={iconClass} />;
      case "pet-friendly":
        return <PawPrint className={iconClass} />;
      case "fireplace":
        return <MdOutlineFireplace className={iconClass} />;
      case "laundry-service":
        return <WashingMachine className={iconClass} />;
      case "smart-tv":
        return <Tv2 className={iconClass} />;
      case "24/7-security":
        return <ShieldCheck className={iconClass} />;
      case "full-kitchen":
        return <ChefHat className={iconClass} />;
      case "shared-kitchen":
        return <TbToolsKitchen2 className={iconClass} />;
      case "wine-tasting":
        return <Wine className={iconClass} />;
      case "home-cooked-meals":
        return <Soup className={iconClass} />;
      case "outdoor-dining":
        return <MdOutlineBrunchDining className={iconClass} />;
      case "bbq-grill":
        return <TbGrill className={iconClass} />;
      case "private-pool":
        return <MdOutlinePool className={iconClass} />;
      case "infinity-pool":
        return <WavesLadder className={iconClass} />;
      case "lake-view":
        return <Waves className={iconClass} />;
      case "rooftop-view":
        return <FaPeopleRoof className={iconClass} />;
      case "balcony":
        return <MdBalcony className={iconClass} />;
      case "garden":
        return <Trees className={iconClass} />;
      case "mountain-views":
        return <Mountain className={iconClass} />;
      case "organic-farm":
        return <Sprout className={iconClass} />;
      case "beach-access":
        return <TbBeach className={iconClass} />;
      case "hiking-trails":
        return <MdOutlineHiking className={iconClass} />;
      case "camping-tent":
        return <Tent className={iconClass} />;
      case "luxury-tent":
        return <FaTent className={iconClass} />;
      case "campfire":
        return <FlameKindling className={iconClass} />;
      case "wildlife-viewing":
        return <Binoculars className={iconClass} />;
      case "guided-safari":
        return <GiCircleForest className={iconClass} />;
      case "stargazing":
        return <Star className={iconClass} />;
      case "bicycle-rental":
        return <Bike className={iconClass} />;
      case "cultural-immersion":
        return <Globe2 className={iconClass} />;
      case "ski-storage":
        return <Snowflake className={iconClass} />;
      case "entire-castle":
        return <Castle className={iconClass} />;
      case "entire-palace":
        return <GiIndianPalace className={iconClass} />;
      case "city-access":
        return <Store className={iconClass} />;
      default:
        return <HelpCircle className={iconClass} />;
    }
  };

  const amenityOptions = allAmenityNames.map((name) => ({
    name,
    icon: getAmenityIcon(name),
  }));

  const formatOptionLabel = ({ name, icon }) => (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
    control: (provided) => ({ ...provided, padding: "4px" }),
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

            {/* DESCRIPTION */}
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

            {/* PRICE */}
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

            {/* PROPERTY DETAIL FIELDS */}
            <div className="property-details-grid">
              <div className="form-group">
                <div className="flex items-center gap-2 text-base">
                  <div className="text-current">
                    <Users className="w-6 h-6" />
                  </div>
                  <label htmlFor="guests">Guests</label>
                </div>
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
                <div className="flex items-center gap-2 text-base">
                  <div className="text-current">
                    <Bed className="w-6 h-6" />
                  </div>
                  <label htmlFor="bedrooms">Bedrooms</label>
                </div>
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
                <div className="flex items-center gap-2 text-base">
                  <div className="text-current">
                    <Bath className="w-6 h-6" />
                  </div>
                  <label htmlFor="bathrooms">Bathrooms</label>
                </div>
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

            {/* Amenities */}
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

            {/* Country */}
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

            {/* Location */}
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

            {/* Category */}
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
                  "Beach",
                  "Camping",
                  "Castles",
                ].map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Image Upload */}
            <div className="form-group">
              <label>Upload New Images</label>

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
              <p className="text-sm text-gray-500 mb-2">
                Uploading new images will replace all existing ones. If you
                don't upload any, your current images will be kept.
              </p>
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
