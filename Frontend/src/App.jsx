import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import Home from "./components/views/Home";
import Login from "./components/users/Login";
import Signup from "./components/users/Signup";
import CreateListing1 from "./components/views/CreateListing1";
import CreateListing2 from "./components/views/CreateListing2";
import ShowListing from "./components/views/ShowListing";
import EditListing from "./components/views/EditListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layouts/Navbar";
import MyListings from "./components/views/MyListing";
import MyWishlist from "./components/views/MyWishlist";
import MyTrips from "./components/views/MyTrips";
import Profile from "./components/users/Profile";
import { CreateListingProvider } from "./context/CreateListingContext";
import Footer from "./components/layouts/Footer";
import Privacy from "./components/extras/Privacy";
import Terms from "./components/extras/Terms";
import Contact from "./components/extras/Contact";
import ScrollToTop from "./components/utils/ScrollToTop";

const NotFound = () => (
  <div style={{ textAlign: "center", marginTop: "5rem" }}>
    <h2>404 - Page Not Found</h2>
    <p>The page you are looking for does not exist.</p>
    <button>
      <Link to="/">Go to Homepage</Link>
    </button>
  </div>
);

function App() {
  return (
    <>
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <ScrollToTop />
          <Navbar />
          <Box sx={{ flexGrow: 1 }}>
            <CreateListingProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/listings/:id" element={<ShowListing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/createListing1" element={<CreateListing1 />} />
                <Route path="/createListing2" element={<CreateListing2 />} />
                <Route path="/listings/:id/edit" element={<EditListing />} />
                <Route path="/myListing" element={<MyListings />} />
                <Route path="/wishlist" element={<MyWishlist />} />
                <Route path="/mytrips" element={<MyTrips />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/contact" element={<Contact />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </CreateListingProvider>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              toastClassName="custom-toast"
            />
          </Box>

          <Footer />
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
