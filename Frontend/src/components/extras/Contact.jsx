import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Stack,
  Paper,
  Link,
  Divider,
  Snackbar, // <-- Added for feedback
  Alert, // <-- Added for feedback
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";
// ForumIcon was unused, so it can be removed for cleaner code.

const contactDetails = [
  {
    icon: <LocationOnIcon color="primary" sx={{ fontSize: 32 }} />,
    title: "Our Office",
    detail: "123 Wanderlust Inc, Los Angeles, CA 90005",
  },
  {
    icon: <EmailIcon color="primary" sx={{ fontSize: 32 }} />,
    title: "Email Us",
    detail: (
      <Link href="mailto:contact@wanderlust.com" underline="hover">
        contact@wanderlust.com
      </Link>
    ),
  },
  {
    icon: <PhoneIcon color="primary" sx={{ fontSize: 32 }} />,
    title: "Call Us",
    detail: "+1 (424)-789-7745",
  },
];

const Contact = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // State to hold form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // State to manage the snackbar feedback
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // can be 'error', 'warning', 'info', or 'success'
  });

  // Handles changes in any text field
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSnackbar({
        open: true,
        message: "Please fill out all required fields.",
        severity: "error",
      });
      return;
    }

    // --- In a real app, you would send the data to your server/API here ---
    console.log("Form Submitted:", formData);

    // Show success message
    setSnackbar({
      open: true,
      message: "Message sent! We will be in touch soon.",
      severity: "success",
    });

    // Reset the form fields after successful submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      {/* Hero Section (Styling is unchanged) */}
      <Box textAlign="center" sx={{ bgcolor: "#f5f5f5", py: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          Contact Us
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We'd love to hear from you. Please fill out the form below, and we'll
          get back to you shortly.
        </Typography>
      </Box>

      <Divider sx={{ my: { xs: 5, md: 8 } }} />

      {/* Main Content  */}
      <Container sx={{ py: 1, mb: 4 }}>
        <Grid container spacing={4} alignItems="stretch">
          {/* Column 1: Contact Info & Map */}
          <Grid >
            <Stack spacing={3}>
              {contactDetails.map((item, index) => (
                <Paper
                  key={index}
                  elevation={2}
                  sx={{ p: 3, display: "flex", alignItems: "center", gap: 2 }}
                >
                  {item.icon}
                  <Box>
                    <Typography variant="h6" component="h3">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.detail}
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
            <Box
              sx={{ mt: 4, height: 250, borderRadius: 2, overflow: "hidden" }}
            >
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Google Map Placeholder"
                referrerPolicy="no-referrer-when-downgrade" // Added for best practice
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423286.2749325989!2d-118.691920484786!3d34.02072992057604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7a163ebddf5%3A0x1111111111111111!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1628588880000!5m2!1sen!2sus"
              ></iframe>
            </Box>
          </Grid>

          {/* Column 2: Message Form */}
          <Grid >
            <Paper elevation={3} sx={{ p: { xs: 3, md: 4 } }}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                sx={{ fontWeight: 600 }}
              >
                Send us a Message
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Stack spacing={3} mt={3}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    variant="outlined"
                    required
                    fullWidth
                  />
                  <TextField
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    rows={6}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    endIcon={<SendIcon />}
                    sx={{ alignSelf: "flex-start" }}
                  >
                    Send Message
                  </Button>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* --- Snackbar for displaying feedback --- */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
