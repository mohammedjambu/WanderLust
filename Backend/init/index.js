// This file is used to add data in the database
const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
.then(() => {
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);   // Database link 
}

const initDB = async () => {
    await Listing.deleteMany({});       // First delete previous data
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67fca0b80d629e439a8c2a78" })); // Add owner id to each object
    await Listing.insertMany(initData.data);        // Add new data
    console.log("Data initialized");
}

initDB();