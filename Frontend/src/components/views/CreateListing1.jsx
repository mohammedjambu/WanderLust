import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { debounce } from "lodash";
import { useCreateListing } from "../../context/CreateListingContext";
import { authDataContext } from "../../context/AuthContext";
import ProgressTracker from "../utils/ProgressTracker";
import "../../utils css/CreateListing.css";
import { toast } from "react-toastify";

const CreateListing1 = () => {
  const navigate = useNavigate();
  const { listingData, updateListingData } = useCreateListing();
  const { authUser, loading: authLoading } = React.useContext(authDataContext);
  const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

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
      country: null,
      location: null,
    },
  });

  useEffect(() => {
    if (listingData) {
      reset({
        title: listingData.title || "",
        description: listingData.description || "",
        price: listingData.price || "",
        country: listingData.country
          ? { value: listingData.country, label: listingData.country }
          : null,
        location: listingData.location
          ? { value: listingData.location, label: listingData.location }
          : null,
      });
    }
  }, [listingData, reset]);

  const selectedCountry = watch("country");

  useEffect(() => {
    if (!authLoading && !authUser) {
      toast.error("You must be logged in to create a listing.");
      navigate("/login");
      return;
    }

    fetch("https://restcountries.com/v3.1/all?fields=name,cca2")
      .then((res) => res.json())
      .then((data) => {
        const formattedCountries = data
          .map((c) => ({
            value: c.name.common,
            label: c.name.common,
            code: c.cca2,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));
        setCountries(formattedCountries);
      })
      .catch((err) => console.error("Failed to fetch countries:", err));
  }, [navigate, authUser, authLoading]);

  const fetchCities = (inputValue, callback) => {
    if (!selectedCountry || inputValue.length < 2) {
      return callback([]);
    }

    const mapboxApiUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      inputValue
    )}.json?country=${
      selectedCountry.code
    }&types=place&access_token=${MAPBOX_TOKEN}`;

    fetch(mapboxApiUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((apiResponse) => {
        const cityOptions = (apiResponse.features || []).map((feature) => ({
          value: feature.text,
          label: feature.place_name,
        }));
        callback(cityOptions);
      })
      .catch((err) => {
        console.error("Mapbox city fetch error:", err);
        toast.error("Could not fetch city data. Please try again later.");
        callback([]);
      });
  };

  const debouncedCityLoad = useMemo(
    () => debounce(fetchCities, 500),
    [selectedCountry, MAPBOX_TOKEN] // Add MAPBOX_TOKEN to dependency array
  );

  const onSubmit = (data) => {
    const formattedData = {
      ...data,
      country: data.country.value,
      countryCode: data.country.code,
      location: data.location.value,
    };
    updateListingData(formattedData);
    navigate("/createListing2");
  };

  return (
    <main className="create-listing-container">
      <div className="form-wrapper">
        <ProgressTracker currentStep={1} />
        <h1 className="form-title">Describe your place</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="form-fields">
            {/* Title, Description, and Price fields */}
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                className={`form-input ${errors.title ? "error-border" : ""}`}
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="error-message">{errors.title.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className={`form-input form-textarea ${
                  errors.description ? "error-border" : ""
                }`}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 20,
                    message: "Use at least 20 characters",
                  },
                })}
              ></textarea>
              {errors.description && (
                <p className="error-message">{errors.description.message}</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="price">Price (per night in ₹)</label>
              <input
                id="price"
                type="number"
                className={`form-input ${errors.price ? "error-border" : ""}`}
                {...register("price", {
                  required: "Price is required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Price must be positive" },
                })}
              />
              {errors.price && (
                <p className="error-message">{errors.price.message}</p>
              )}
            </div>

            {/* Country Field */}
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
              {errors.country && (
                <p className="error-message">{errors.country.message}</p>
              )}
            </div>

            {/* Location/City Field */}
            <div className="form-group">
              <label htmlFor="location">City / Location</label>
              <Controller
                name="location"
                control={control}
                rules={{ required: "City/Location is required" }}
                render={({ field }) => (
                  <AsyncSelect
                    {...field}
                    inputId="location"
                    key={selectedCountry ? selectedCountry.code : "no-country"}
                    loadOptions={debouncedCityLoad}
                    isDisabled={!selectedCountry}
                    placeholder={
                      !selectedCountry
                        ? "Select a country first"
                        : "Type to search for a city..."
                    }
                    cacheOptions
                    defaultOptions
                    classNamePrefix="react-select"
                    className={`react-select-container ${
                      errors.location ? "error-border" : ""
                    }`}
                  />
                )}
              />
              {errors.location && (
                <p className="error-message">{errors.location.message}</p>
              )}
            </div>
          </div>

          <div className="form-navigation">
            <div />
            <button type="submit" className="nav-button next">
              Next
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreateListing1;
