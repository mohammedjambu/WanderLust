import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";
import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/users/Login";
import Signup from "./pages/users/Signup";
import CreateListing1 from "./pages/Listing/CreateListing1";
import CreateListing2 from "./pages/Listing/CreateListing2";
import ShowListing from "./pages/Home/ShowListing";
import EditListing from "./pages/Home/EditListing";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/layouts/Navbar";
import MyListings from "./pages/Home/MyListing";
import MyWishlist from "./pages/Wishlist/MyWishlist";
import MyTrips from "./pages/Home/MyTrips";
import Profile from "./pages/Profile/Profile";
import { CreateListingProvider } from "./context/CreateListingContext";
import Footer from "./components/layouts/Footer";
import { CssBaseline } from "@mui/material";
import Privacy from "./components/extras/Privacy";
import Terms from "./components/extras/Terms";
import Contact from "./components/extras/Contact";
import ScrollToTop from "./components/utils/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <Box
          sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >
          <ScrollToTop />     
          <Navbar />
          <Box sx={{ flexGrow: 1}}>

          <CreateListingProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings/:id" element={<ShowListing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/createListing1" element={<CreateListing1 />} />
              <Route path="/createListing2" element={<CreateListing2 />} />
              <Route path="/listings/:id/edit" element={<EditListing />} />
              <Route path="/editListing" element={<EditListing />} />
              <Route path="/myListing" element={<MyListings />} />
              <Route path="/wishlist" element={<MyWishlist />} />
              <Route path="/mytrips" element={<MyTrips />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
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
