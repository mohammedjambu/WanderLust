import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// MUI Components
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Fab from '@mui/material/Fab';
import Fade from '@mui/material/Fade';

// MUI Icons
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArrowUpward from '@mui/icons-material/ArrowUpward';

const MuiFooter = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener for scrolling
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Box
        component="footer"
        sx={{
          bgcolor: "background.paper",
          py: 3,
          boxShadow: "0 -4px 12px rgba(0,0,0,0.2)",
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Follow us on social media
          </Typography>

          {/* Social Icons */}
          <Stack direction="row" spacing={1.5} justifyContent="center" mb={3}>
            <IconButton
              href="https://www.instagram.com/airbnb/"
              aria-label="Instagram"
              sx={{
                bgcolor: "#fcefed",
                color: "#dd2a7b",
                "&:hover": { bgcolor: "#fbdbe9" },
              }}
            >
              <InstagramIcon />
            </IconButton>
            <IconButton
              href="https://www.facebook.com/airbnb/"
              aria-label="Facebook"
              sx={{
                bgcolor: "#eef5ff",
                color: "#3b5998",
                "&:hover": { bgcolor: "#dbeaff" },
              }}
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/mohammed-jambughoda"
              aria-label="LinkedIn"
              sx={{
                bgcolor: "#eef5ff",
                color: "#0077b5",
                "&:hover": { bgcolor: "#dbeaff" },
              }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>

          <Divider sx={{ maxWidth: 500, mx: "auto", mb: 3 }} />

          {/* Footer Links */}
          <Stack direction="row" spacing={3} justifyContent="center" mb={2}>
            <Link
              component={RouterLink}
              to="/privacy"
              variant="body2"
              color="primary"
              underline="hover"
            >
              Privacy Policy
            </Link>
            <Link
              component={RouterLink}
              to="/terms"
              variant="body2"
              color="primary"
              underline="hover"
            >
              Terms of Service
            </Link>
            <Link
              component={RouterLink}
              to="/contact"
              variant="body2"
              color="primary"
              underline="hover"
            >
              Contact Us
            </Link>
          </Stack>

          {/* Copyright */}
          <Typography variant="caption" color="text.secondary">
            © {new Date().getFullYear()} WanderLust Private Limited. All rights
            reserved.
          </Typography>
        </Container>
      </Box>

      {/* Back to Top Button */}
      <Fade in={isVisible}>
        <Box
          onClick={scrollToTop}
          role="presentation"
          sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}
        >
          <Fab color="primary" size="medium" aria-label="scroll back to top">
            <ArrowUpward />
          </Fab>
        </Box>
      </Fade>
    </>
  );
};

export default MuiFooter;