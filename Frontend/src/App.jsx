import { Route, Routes, useParams } from "react-router-dom"
import './App.css'
import Home from "./pages/Home/Home"
import Login from "./pages/users/Login"
import Signup from "./pages/users/Signup"
import CreateListing1 from "./pages/Listing/CreateListing1"
import CreateListing2 from "./pages/Listing/CreateListing2"
import ShowListing from "./pages/Home/ShowListing"
import EditListing from "./pages/Home/EditListing"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar"
import MyListings from "./pages/Home/MyListing"
import MyWishlist from './pages/Wishlist/MyWishlist';
import MyTrips from "./pages/Home/MyTrips"
import Profile from "./pages/Profile/Profile"
import { CreateListingProvider } from "./context/CreateListingContext"
// import { CreateListingProvider } from './context/CreateListingContext';



function App() {


  return (
    <>
      <Navbar />  
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
      </Routes>
      </CreateListingProvider>
        <ToastContainer position="top-right" autoClose={3000} toastClassName="custom-toast" />
    </>
  )
}

export default App;


