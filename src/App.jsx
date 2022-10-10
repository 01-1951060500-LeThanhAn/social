import React from "react";
import Home from "./components/Home/Home.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/Profile/Profile";
import SignUp from "./components/SignUp/SignUp";

import "react-loading-skeleton/dist/skeleton.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RoomChat from "./components/RoomChat/RoomChat.jsx";



const App = () => {
 
  return (
    <>
      <ToastContainer />
      <div>
        <Router>
          <Routes>
            <Route  path="/" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/room/:id" element={<RoomChat />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Routes>
        </Router>
      </div>
    </>
  );
};

export default App;
