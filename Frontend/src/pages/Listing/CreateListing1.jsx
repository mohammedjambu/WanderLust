// src/pages/CreateListing1.jsx

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form'; // Import Controller
import Select from 'react-select'; // For the country dropdown
import AsyncSelect from 'react-select/async'; // For the city autocomplete
import { debounce } from 'lodash'; //  Import the debounce utility
import { useCreateListing } from '../../context/CreateListingContext';
import ProgressTracker from './ProgressTracker';
import './CreateListing.css';

const CreateListing1 = () => {
    const navigate = useNavigate();
    const { listingData, updateListingData } = useCreateListing();

    const [countries, setCountries] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Single loading state

    // ✅ STEP 1: Initialize the form with STATIC, empty default values.
    // This guarantees that useForm will never crash on initialization.
    const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            price: '',
            country: null,
            location: null,
        }
    });

    // ✅ STEP 2: Use a `useEffect` to populate the form with context data.
    // This is the officially recommended way to handle async default values.
    // It runs AFTER the initial render, once we know `listingData` is available.
    useEffect(() => {
        if (listingData) {
            reset({ // 'reset' is the correct function to update all form values
                title: listingData.title || '',
                description: listingData.description || '',
                price: listingData.price || '',
                country: listingData.country || null,
                location: listingData.location || null,
            });
        }
    }, [listingData, reset]); // Dependency array ensures this runs if the data changes

    const selectedCountry = watch('country');

    // Fetch countries and handle auth check
    useEffect(() => {
        // Auth check
        fetch("http://localhost:5000/api/auth/check", { credentials: "include" })
          .then(res => res.ok ? res.json() : Promise.reject(res))
          .then(data => {
              if (!data.loggedIn) navigate("/login");
          })
          .catch(() => navigate("/login"));

        // Countries fetch
        const countriesApiUrl = "https://restcountries.com/v3.1/all?fields=name,cca2";
        fetch(countriesApiUrl)
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    const formattedCountries = data.map(country => ({
                        value: country.name.common,
                        label: country.name.common,
                        code: country.cca2,
                    }));
                    setCountries(formattedCountries.sort((a, b) => a.label.localeCompare(b.label)));
                } else {
                    throw new Error("Received country data is not an array");
                }
            })
            .catch(err => console.error("Failed to fetch or process countries:", err))
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const fetchCities = (inputValue, callback) => {
        if (!selectedCountry || inputValue.length < 2) return callback([]);
        const geoDbApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${inputValue}&countryIds=${selectedCountry.code}`;
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': import.meta.env.VITE_GEODB_API_KEY,
                'x-rapidapi-host': import.meta.env.VITE_GEODB_API_HOST
            }
        };
        fetch(geoDbApiUrl, options)
            .then(res => {
                if (!res.ok) throw new Error(`City API fetch failed with status: ${res.status}`);
                return res.json();
            })
            .then(apiResponse => {
                const cityOptions = (apiResponse.data || []).map(city => ({
                    value: city.city, label: `${city.city}, ${city.region}`
                }));
                callback(cityOptions);
            })
            .catch(err => {
                console.error("City fetch error:", err);
                callback([]);
            });
    };

    const debouncedCityLoad = useMemo(() => debounce(fetchCities, 500), [selectedCountry]);

    const onSubmit = (data) => {
        const formattedData = {
            ...data,
            country: data.country.value,
            location: data.location.value,
        };
        updateListingData(formattedData);
        navigate('/createListing2');
    };

    // ✅ STEP 3: Add a "guard clause" to prevent rendering the form too early.
    // If the countries haven't loaded, it's better to show a loading indicator.
    if (isLoading) {
        return <div className="create-listing-container"><div className="form-wrapper"><p>Loading form...</p></div></div>;
    }

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
                            <input id="title" type="text" className={`form-input ${errors.title ? 'error-border' : ''}`} {...register("title", { required: "Title is required" })} />
                            {errors.title && <p className="error-message">{errors.title.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" className={`form-input form-textarea ${errors.description ? 'error-border' : ''}`} {...register("description", { required: "Description is required", minLength: { value: 20, message: "Use at least 20 characters" } })}></textarea>
                            {errors.description && <p className="error-message">{errors.description.message}</p>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price (per night in ₹)</label>
                            <input id="price" type="number" className={`form-input ${errors.price ? 'error-border' : ''}`} {...register("price", { required: "Price is required", valueAsNumber: true, min: { value: 1, message: "Price must be positive" } })} />
                            {errors.price && <p className="error-message">{errors.price.message}</p>}
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
                                        className={`react-select-container ${errors.country ? 'error-border' : ''}`}
                                    />
                                )}
                            />
                            {errors.country && <p className="error-message">{errors.country.message}</p>}
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
                                        key={selectedCountry ? selectedCountry.code : 'no-country'}
                                        loadOptions={debouncedCityLoad}
                                        isDisabled={!selectedCountry}
                                        placeholder={!selectedCountry ? "Select a country first" : "Type to search for a city..."}
                                        cacheOptions
                                        defaultOptions
                                        classNamePrefix="react-select"
                                        className={`react-select-container ${errors.location ? 'error-border' : ''}`}
                                    />
                                )}
                            />
                             {errors.location && <p className="error-message">{errors.location.message}</p>}
                        </div>
                    </div>
                    
                    <div className="form-navigation">
                        <div />
                        <button type="submit" className="nav-button next">Next</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default CreateListing1;