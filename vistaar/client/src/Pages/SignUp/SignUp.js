import React, { useState } from "react";
import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const auth = getAuth(app);
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        navigate("/customers");
      })
      .catch((err) => {
        console.log("error in firebase createUser", err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="Name"
              className="form-control rounded-0"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p>Don't Have Account?</p>
        <button className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
          Register
        </button>
      </div>
    </div>
  );
}

export default SignUp;
