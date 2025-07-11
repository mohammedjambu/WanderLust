// ✅ EditListing.jsx — Now pre-fills all values directly instead of placeholders

import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { debounce } from 'lodash';
import { X } from 'lucide-react';
import { toast } from "react-toastify";
import ImageUpload from '../Listing/ImageUpload';
import "./EditListing.css";


const EditListing = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [countries, setCountries] = useState([]);
    const [existingImages, setExistingImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);

    const { register, handleSubmit, control, watch, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '', description: '', price: '', category: '',
            country: null, location: null, newImages: [],
        }
    });

    const selectedCountry = watch('country');

    // Fetch initial listing data
    useEffect(() => {
        const fetchListing = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/listings/${id}`);
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to fetch listing");
                reset({
                    title: data.title, description: data.description, price: data.price, category: data.category,
                    country: { value: data.country, label: data.country, code: '' },
                    location: { value: data.location, label: data.location },
                    newImages: [], // Always start with an empty newImages array
                });
                setExistingImages(data.images || []);
            } catch (err) {
                toast.error(err.message);
                navigate("/");
            }
        };
        fetchListing();
    }, [id, reset, navigate]);

    // Fetch country data
    useEffect(() => {
        const countriesApiUrl = "https://restcountries.com/v3.1/all?fields=name,cca2";
        fetch(countriesApiUrl)
            .then(res => res.json())
            .then(data => {
                const formattedCountries = data.map(c => ({ value: c.name.common, label: c.name.common, code: c.cca2 }));
                setCountries(formattedCountries.sort((a, b) => a.label.localeCompare(b.label)));
                
                const currentCountryName = watch('country')?.value;
                if (currentCountryName) {
                    const fullCountry = formattedCountries.find(c => c.value === currentCountryName);
                    if (fullCountry) reset({ ...watch(), country: fullCountry });
                }
            })
            .catch(err => console.error("Failed to fetch countries", err))
            .finally(() => setIsLoading(false));
    }, [reset, watch]);

    // City fetching logic (no changes needed)
    const fetchCities = (inputValue, callback) => {
        if (!selectedCountry?.code || inputValue.length < 2) return callback([]);
        const geoDbApiUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=10000&namePrefix=${inputValue}&countryIds=${selectedCountry.code}`;
        const options = { method: 'GET', headers: { 'x-rapidapi-key': import.meta.env.VITE_GEODB_API_KEY, 'x-rapidapi-host': import.meta.env.VITE_GEODB_API_HOST }};
        fetch(geoDbApiUrl, options)
            .then(res => res.json())
            .then(apiResponse => {
                const cityOptions = (apiResponse.data || []).map(city => ({ value: city.city, label: `${city.city}, ${city.region}` }));
                callback(cityOptions);
            })
            .catch(() => callback([]));
    };
    const debouncedCityLoad = useMemo(() => debounce(fetchCities, 500), [selectedCountry]);

    // Toggle image deletion (no changes needed)
    const handleToggleDeleteImage = (filename) => {
        setImagesToDelete(prev => prev.includes(filename) ? prev.filter(f => f !== filename) : [...prev, filename]);
    };

    // Form submission (no changes needed)
    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("category", data.category);
        formData.append("country", data.country.value);
        formData.append("location", data.location.value);
        if (data.newImages && data.newImages.length > 0) {
            data.newImages.forEach(file => formData.append("images", file));
        }
        if (imagesToDelete.length > 0) {
            formData.append("deletedImages", JSON.stringify(imagesToDelete));
        }
        formData.append("propertyDetails", JSON.stringify({ guests: 4, bedrooms: 2, bathrooms: 2 }));
        formData.append("amenities", JSON.stringify([{ name: "Wi-Fi", icon: "🌐" }]));
        try {
            const res = await fetch(`http://localhost:5000/api/listings/${id}`, { method: "PUT", credentials: "include", body: formData });
            if (!res.ok) throw new Error((await res.json()).error || 'Update failed');
            toast.success("Listing updated successfully!");
            navigate(`/listings/${id}`);
        } catch (err) {
            toast.error(err.message);
        }
    };
    
    if (isLoading) return <div className="edit-listing-container"><div className="form-wrapper"><p>Loading Editor...</p></div></div>;

    return (
        <main className="edit-listing-container">
            <div className="form-wrapper">
                <h1 className="form-title">Edit Your Listing</h1>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-fields">
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input id="title" {...register("title", { required: "Title is required" })} className={`form-input ${errors.title ? 'error-border' : ''}`} />
                        </div>
                        {/* The rest of the form fields */}
                         <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" {...register("description", { required: "Description is required" })} className={`form-textarea ${errors.description ? 'error-border' : ''}`}></textarea>
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price (₹ per night)</label>
                            <input id="price" type="number" {...register("price", { required: "Price is required", min: 1 })} className={`form-input ${errors.price ? 'error-border' : ''}`} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="country">Country</label>
                            <Controller name="country" control={control} rules={{ required: "Country is required" }} render={({ field }) => ( <Select {...field} inputId="country" options={countries} classNamePrefix="react-select" className={`react-select-container ${errors.country ? 'error-border' : ''}`} /> )} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">City / Location</label>
                            <Controller name="location" control={control} rules={{ required: "City is required" }} render={({ field }) => ( <AsyncSelect {...field} inputId="location" key={selectedCountry?.code} loadOptions={debouncedCityLoad} isDisabled={!selectedCountry?.code} placeholder="Type to search..." cacheOptions defaultOptions classNamePrefix="react-select" className={`react-select-container ${errors.location ? 'error-border' : ''}`} /> )}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select id="category" {...register("category", { required: "Category is required" })} className={`form-select ${errors.category ? 'error-border' : ''}`}>
                                <option value="" disabled>Select category</option>
                                {["Villa", "Farm House", "Pool House", "Rooms", "Flat", "PG", "Cabin", "Shops"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        {existingImages.length > 0 && (
                            <div className="form-group">
                                <label>Existing Images (Click to mark for deletion)</label>
                                <div className="existing-images-grid">
                                    {existingImages.map(img => (
                                        <div key={img.filename} className={`existing-image-item ${imagesToDelete.includes(img.filename) ? 'marked-for-deletion' : ''}`} onClick={() => handleToggleDeleteImage(img.filename)}>
                                            <img src={img.url} alt="Existing listing" />
                                            {imagesToDelete.includes(img.filename) && <div className="existing-image-delete-btn"><X size={20}/></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <label>Upload New Images (Optional)</label>
                            <Controller name="newImages" control={control} render={({ field }) => (<ImageUpload value={field.value} onFilesChange={field.onChange} />)} />
                        </div>
                    </div>
                    
                    <div className="form-navigation">
                        <button type="button" className="nav-button secondary" onClick={() => navigate(`/listings/${id}`)}>Cancel</button>
                        <button type="submit" className="nav-button primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default EditListing;