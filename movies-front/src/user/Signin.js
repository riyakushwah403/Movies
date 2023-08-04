import React, { useState } from "react";
import Layout from "../All/Layout";
import { signin } from "../auth/user";
import { Link, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [redirectUser, setRedirectUser] = useState(false);
  const [isUserSignedIn, setIsUserSignedIn] = useState(false);
  let navigate = useNavigate(); 
  // const routeChange = () =>{ 
    // let path = `newPath`; 
   
  // }

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          console.log("Authentication successful:", data);
          // Store the authentication details in localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
          console.log("data", data.user);
          localStorage.setItem("token", data.token);
          setRedirectUser(true);
          setIsUserSignedIn(true);

          setEmail("");
          setPassword("");
          navigate('/');
        }
      })
      .catch((error) => {
        setError("An error occurred. Please try again.");
        console.error("Error during API call:", error);
      });
  };



  return (
    <Layout>
      <div>
        <h2>Sign In</h2>
        {error && <div>{error}</div>}
        <form onSubmit={handleSubmit} className="form-control">
          <div>
            <label>Email</label>
            <input
            className="form-item"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
            className="form-item"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          {/* <Link to= "/" > */}
          <button type="submit">Sign In</button>
          {/* </Link> */}
        </form>
      </div>
    </Layout>
  );
};

export default Signin;
