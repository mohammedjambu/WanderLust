import React from "react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";

// Import icons for the Terms page
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import DoNotDisturbOnOutlinedIcon from "@mui/icons-material/DoNotDisturbOnOutlined";
import CopyrightOutlinedIcon from "@mui/icons-material/CopyrightOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

// --- Data for our Terms of Service ---
const termsData = [
  {
    id: 1,
    title: "Agreement to Terms",
    icon: <HandshakeOutlinedIcon />,
    intro:
      "By accessing or using our services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service. These terms apply to all visitors, users, and others who wish to access or use the Service.",
  },
  {
    id: 2,
    title: "User Accounts & Responsibilities",
    icon: <AccountBoxOutlinedIcon />,
    intro:
      "When you create an account with us, you guarantee that you are above the age of 18 and that the information you provide is accurate, complete, and current. You are responsible for:",
    list: [
      "Safeguarding the password that you use to access the Service.",
      "Any activities or actions under your password, whether your password is with our Service or a third-party service.",
      "Notifying us immediately upon becoming aware of any breach of security or unauthorized use of your account.",
    ],
  },
  {
    id: 3,
    title: "Prohibited Activities",
    icon: <DoNotDisturbOnOutlinedIcon />,
    intro:
      "You may not use the Service for any illegal or unauthorized purpose. You agree to comply with all laws, rules, and regulations applicable to your use of the Service. Prohibited activities include, but are not limited to:",
    list: [
      "Using the service in any way that could damage, disable, overburden, or impair it.",
      "Attempting to gain unauthorized access to any part of the service or its related systems.",
      'Using any automated system, including "robots" or "spiders," to access the service for any purpose without our express written permission.',
      "Posting content that is defamatory, obscene, or abusive.",
    ],
  },
  {
    id: 4,
    title: "Intellectual Property",
    icon: <CopyrightOutlinedIcon />,
    intro:
      "The Service and its original content, features, and functionality are and will remain the exclusive property of WanderLust Private Limited and its licensors. Our trademarks may not be used in connection with any product or service without our prior written consent.",
  },
  {
    id: 5,
    title: "Termination",
    icon: <CancelOutlinedIcon />,
    intro:
      "We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever, including, without limitation, a breach of the Terms.",
  },
  {
    id: 6,
    title: "Limitation of Liability",
    icon: <WarningAmberOutlinedIcon />,
    intro:
      "In no event shall WanderLust, nor its directors or employees, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your access to or use of the Service.",
  },
];

// --- The Main Component ---
const Terms = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box sx={{ bgcolor: "white", py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          sx={{ fontWeight: 700, color: "#3d7fe3ff", mb: 2 }}
        >
          Terms of Service
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          These Terms of Service govern your use of the WanderLust website and
          any related services provided by us. Please read them carefully.
        </Typography>
        <Divider sx={{ mb: 6 }} />
        <Stack spacing={6}>
          {termsData.map((section) => (
            <Box key={section.id} component="section">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    bgcolor: "#d9dae4ff",
                    color: "#3F51B5",
                    borderRadius: "50%",
                    display: "flex",
                    p: 1.2,
                  }}
                >
                  {React.cloneElement(section.icon, {
                    sx: { fontSize: "2rem" },
                  })}
                </Box>
                <Typography
                  variant="h4"
                  component="h2"
                  sx={{ fontWeight: 600, color: "#3F51B5" }}
                >
                  {section.id}. {section.title}
                </Typography>
              </Stack>
              {section.intro && (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 2, pl: { xs: 0, md: 2 } }}
                >
                  {section.intro}
                </Typography>
              )}
              {section.list && (
                <Box
                  component="ul"
                  sx={{ pl: { xs: 4, md: 8 }, m: 0, listStyleType: "disc" }}
                >
                  {section.list.map((item, index) => (
                    <Typography
                      key={index}
                      component="li"
                      variant="body1"
                      color="text.secondary"
                      sx={{ mb: 1, pl: 1 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default Terms;
