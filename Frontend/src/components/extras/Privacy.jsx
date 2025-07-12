import React from "react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";

// Import the icons we'll need
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DnsOutlinedIcon from "@mui/icons-material/DnsOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

// --- Expanded Data for our Privacy Policy ---
const policyData = [
  {
    id: 1,
    title: "Information We Collect",
    icon: <InfoOutlinedIcon />,
    details: [
      {
        icon: <AccountCircleOutlinedIcon color="primary" />,
        title: "Personal Information",
        text: "Name, email address, phone number, date of birth, passport details (for bookings).",
      },
      {
        icon: <DnsOutlinedIcon color="primary" />,
        title: "Usage Data",
        text: "IP address, browser type, pages visited, time spent on pages, clickstream data, and device information.",
      },
      {
        icon: <CreditCardOutlinedIcon color="primary" />,
        title: "Payment Information",
        text: "Credit card details (processed securely through our payment partners), billing address, and transaction history.",
      },
    ],
  },
  {
    id: 2,
    title: "How We Use Your Information",
    icon: <TaskAltOutlinedIcon />,
    intro:
      "We use the information we collect for various purposes, including to:",
    list: [
      "Process and manage your bookings, reservations, and payments.",
      "Communicate with you regarding your account, support requests, or our services.",
      "Improve, personalize, and expand our website and services.",
      "Prevent fraudulent transactions and enhance the security of our platform.",
      "Comply with legal obligations and respond to lawful requests from public authorities.",
    ],
  },
  {
    id: 3,
    title: "Sharing Your Information",
    icon: <ShareOutlinedIcon />,
    intro:
      "We do not sell your personal information. We may share your information in the following situations:",
    list: [
      "With Service Providers: We share data with third-party vendors who perform services on our behalf, such as payment processing, data analysis, and email delivery.",
      "For Legal Reasons: We may disclose your information if required by law or in response to valid requests by public authorities (e.g., a court or a government agency).",
      "With Your Consent: We may disclose your personal information for any other purpose with your consent.",
    ],
  },
  {
    id: 4,
    title: "Your Data Protection Rights",
    icon: <VerifiedUserOutlinedIcon />,
    intro:
      "You have certain data protection rights. We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. Your rights include:",
    list: [
      "The right to access, update or delete the information we have on you.",
      "The right of rectification if that information is inaccurate or incomplete.",
      "The right to object to our processing of your Personal Data.",
      "The right to data portability for the information you provide to us.",
    ],
  },
  {
    id: 5,
    title: "Contact Us",
    icon: <EmailOutlinedIcon />,
    intro:
      "If you have any questions about this Privacy Policy, you can contact us:",
    list: [
      "By email: privacy@wanderlust.com",
      "By mail: WanderLust Private Limited, 123 Wanderlust Ln, Travel City, 12345",
    ],
  },
];

// --- The Main Component ---
const Privacy = () => {
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
          Privacy Policy
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          textAlign="center"
          sx={{ mb: 6 }}
        >
          At WanderLust, we are committed to protecting your privacy. This
          policy outlines our practices regarding data collection, use, and
          disclosure when you use our services.
        </Typography>
        <Divider sx={{ mb: 6 }} />
        <Stack spacing={6}>
          {policyData.map((section) => (
            <Box key={section.id} component="section">
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{ mb: 3 }}
              >
                <Box
                  sx={{
                    bgcolor: "#e7e3e7ff",
                    color: "#8E24AA",
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
                  sx={{ fontWeight: 600, color: "#8E24AA" }}
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
              {section.details && (
                <Stack spacing={3} sx={{ pl: { xs: 2, md: 4 } }}>
                  {section.details.map((detail, index) => (
                    <Stack
                      key={index}
                      direction="row"
                      spacing={2.5}
                      alignItems="flex-start"
                    >
                      {React.cloneElement(detail.icon, { sx: { mt: 0.5 } })}
                      <Box>
                        <Typography
                          variant="h6"
                          component="h3"
                          sx={{ fontWeight: 600 }}
                        >
                          {detail.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {detail.text}
                        </Typography>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
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

export default Privacy;
