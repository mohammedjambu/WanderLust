import { Route, Routes, useParams } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/users/Login"
import Signup from "./pages/users/Signup"
import CreateListing1 from "./pages/Listing/CreateListing1"
import CreateListing2 from "./pages/Listing/CreateListing2"
import ShowListing from "./pages/Home/ShowListing"
import EditListing from "./pages/Home/EditListing"



function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings/:id" element={<ShowListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/createListing1" element={<CreateListing1 />} />
        <Route path="/createListing2" element={<CreateListing2 />} />
        <Route path="/listings/:id/edit" element={<EditListing />} />
        <Route path="/editListing" element={<EditListing />} />
      </Routes>
    </>
  )
}

export default App;


