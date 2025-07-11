// src/context/CreateListingContext.js

import React, { createContext, useState, useContext } from "react";

const CreateListingContext = createContext();

export const useCreateListing = () => {
  const context = useContext(CreateListingContext);

  // ✅ This is the improvement
  if (context === undefined) {
    throw new Error(
      "useCreateListing must be used within a CreateListingProvider. Check your App.js or router setup."
    );
  }

  return context;
};

const initialState = {
  title: "",
  description: "",
  price: "",
  country: null,
  location: null,
  category: null,
  images: [],
  // Add any other fields that are part of your form
};

export const CreateListingProvider = ({ children }) => {
  const [listingData, setListingData] = useState(initialState);

  const updateListingData = (newData) => {
    setListingData((prevData) => ({ ...prevData, ...newData }));
  };

  const resetListingData = () => {
    setListingData(initialState);
  };

  const value = { listingData, updateListingData, resetListingData };

  return (
    <CreateListingContext.Provider value={value}>
      {children}
    </CreateListingContext.Provider>
  );
};
