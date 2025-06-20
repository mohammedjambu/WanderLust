import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Box,
  Button,
  CardMedia,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import OutdoorGrillIcon from "@mui/icons-material/OutdoorGrill";
import PlaceIcon from "@mui/icons-material/Place";

const ShowListing = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching listing:", err);
      setLoading(false);
    }
  };

  if (loading) return <Typography variant="h5">Loading...</Typography>;
  if (!listing) return <Typography variant="h5">Listing not found</Typography>;

  // Default amenities based on the new image
  const defaultAmenities = [
    { title: "Designed for staying cool", description: "Beat the heat with the A/C, portable fan and ceiling fan." },
    { title: "Outdoor entertainment", description: "The alfresco dining and outdoor seating are great for summer trips." },
    { title: "Beautiful area", description: "This home is in a scenic location." },
  ];
  const amenities = listing.amenities || defaultAmenities;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Listing Title and Details */}
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {listing.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          {listing.location}, {listing.country}
        </Typography>

        {/* Image */}
        <Box sx={{ my: 3, borderRadius: 3, overflow: "hidden" }}>
          <CardMedia
            component="img"
            image={listing.image.url}
            alt={listing.title}
            sx={{ width: "100%", height: 400, objectFit: "cover" }}
          />
        </Box>

        <Grid container spacing={4}>
          {/* Left Section (Details) - Scrollable */}
          <Grid item xs={12} md={8}>
            <Box sx={{ maxHeight: "60vh", overflowY: "auto", paddingRight: 2 }}>
              {/* Host Info (Placeholder - adjust based on API) */}
              <Box display="flex" alignItems="center" mb={3}>
                <PersonIcon sx={{ fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Hosted by {listing.host?.username || "Host"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {listing.host?.hostingYears || "12"} years hosting
                  </Typography>
                </Box>
              </Box>

              {/* What This Place Offers */}
              <Box mb={5}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  What this place offers
                </Typography>
                <Grid container spacing={2}>
                  {amenities.map((item, index) => {
                    const icons = [<AcUnitIcon />, <OutdoorGrillIcon />, <PlaceIcon />];
                    return (
                      <Grid item xs={12} sm={6} key={index}>
                        <Box display="flex" gap={2} alignItems="start">
                          {icons[index % icons.length]}
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              {/* About This Place */}
              <Box mb={4}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                  About this place
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {listing.description ||
                    "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!"}
                </Typography>
              </Box>

              <Button
                component={Link}
                to={`/listings/${id}/edit`}
                variant="outlined"
                color="error"
                sx={{ mt: 2 }}
              >
                Edit Listing
              </Button>
            </Box>
          </Grid>

          {/* Right Section - Sticky Reserve Box */}
          <Grid item xs={12} md={4} sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 4,
                position: "sticky",
                top: 100,
                backgroundColor: "#fff",
                width: "100%",
                maxWidth: 300,
              }}
            >
              <Box display="flex" alignItems="baseline" gap={1}>
                <Typography variant="h6" fontWeight="bold" color="text.primary">
                  ₹{listing.price?.toLocaleString("en-IN") || "1,200"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  / night
                </Typography>
              </Box>
              <Typography variant="caption" color="text.secondary" display="block" mt={1}>
                Prices include all fees
              </Typography>

              <Box mt={2}>
                <TextField
                  label="Check-in"
                  type="date"
                  fullWidth
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Check-out"
                  type="date"
                  fullWidth
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  select
                  label="Guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  fullWidth
                  sx={{ mb: 3 }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((g) => (
                    <MenuItem key={g} value={g}>
                      {g} {g === 1 ? "guest" : "guests"}
                    </MenuItem>
                  ))}
                </TextField>

                <Button
                  variant="contained"
                  fullWidth
                  sx={{
                    mt: 2,
                    py: 1.5,
                    borderRadius: "999px",
                    fontWeight: "bold",
                    backgroundColor: "#e00b41",
                    "&:hover": { backgroundColor: "#c30034" },
                  }}
                >
                  Reserve
                </Button>
                <Typography
                  variant="caption"
                  display="block"
                  textAlign="center"
                  mt={1}
                  color="text.secondary"
                >
                  You won't be charged yet
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </motion.div>
    </Container>
  );
};

export default ShowListing;