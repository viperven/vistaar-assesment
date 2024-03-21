import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignIn from "./Pages/SignIn/SignIn";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/SignUp/SignUp";
import Customers from "./Pages/Customers/Customers";
import Test from "./Test";
import Transactions from "./Pages/Transactions/Transactions";

function App() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </>
  );
}

export default App;
