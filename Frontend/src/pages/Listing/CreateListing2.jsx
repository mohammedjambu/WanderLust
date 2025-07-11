import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useCreateListing } from "../../context/CreateListingContext";
import "./CreateListing.css";
import ProgressTracker from "./ProgressTracker";
import ImageUpload from "./ImageUpload";

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
import { MdBedroomParent, MdOutlinePool } from "react-icons/md";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { useEffect } from "react";

const categoryOptions = [
  { name: "Villa", icon: <GiFamilyHouse /> },
  { name: "Farm House", icon: <FaTreeCity /> },
  { name: "Pool House", icon: <MdOutlinePool /> },
  { name: "Rooms", icon: <MdBedroomParent /> },
  { name: "Flat", icon: <BiBuildingHouse /> },
  { name: "PG", icon: <IoBedOutline /> },
  { name: "Cabin", icon: <GiWoodCabin /> },
  { name: "Shops", icon: <SiHomeassistantcommunitystore /> },
  { name: "Beach", icon: <FaUmbrellaBeach /> },
  { name: "Camping", icon: <GiCampingTent /> },
  { name: "Castles", icon: <GiCastle /> },
];

const CreateListing2 = () => {
  const navigate = useNavigate();
  const { listingData, resetListingData } = useCreateListing();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: listingData.category || null,
      images: listingData.images || [],
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

  // useEffect(() => {
  //   if (!listingData.title) {
  //     toast.error("Please start from step 1.");
  //     navigate("/createListing1");
  //   }
  // }, [listingData, navigate]);

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

    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }

    // You can append other static details here
    formData.append(
      "propertyDetails",
      JSON.stringify({ guests: 4, bedrooms: 2, bathrooms: 2 })
    );

    formData.append("amenities", JSON.stringify([]));

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
