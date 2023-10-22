// Library Imports
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// Style Imports
import "react-toastify/dist/ReactToastify.css";

// File Imports
import { userLoginApiCall } from "../../services/authServices";

const Login = () => {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Error States
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // useNavigate for routing
  const navigate = useNavigate();

  // Function on clicking login button
  const handleLogin = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    // Validation function calls
    validateEmail(email);
    validatePassword(password);
    try {
      const data = {
        email: email,
        password: password,
      };
      // Login API Response
      const requestResponse = await userLoginApiCall(data);
      if (requestResponse.status == 200) {
        localStorage.setItem("userID", requestResponse.data.id);
        const token = requestResponse.data.token;
        const userRole = requestResponse.data.role;
        // Localstorage storing 
        localStorage.setItem("token", token);
        localStorage.setItem("role", userRole);
        // Navigate to the homepage after successful login
        if (userRole === "Admin") {
          navigate("/adminhome");
        } else if (userRole === "Worker") {
          navigate("/workerhome");
        }
      } else {
        showToastMessageError();
      }
    } catch (error) {
      console.error(error);
      setError("Invalid credentials");
    }
  };

  // Validating Email
  const validateEmail = (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email Required");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
  };
  
  // Validating password
  const validatePassword = (value: any) => {
    if (!value) {
      setPasswordError("Password required");
    } else if (value.length > 8) {
      setPasswordError("Password must be less than 8 characters");
    } else {
      setPasswordError("");
    }
  };

  // Toast error
  const showToastMessageError = () => {
    toast.error("Invalid Credentials !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Button disable flag
  const isButtonDisabled = email === "" || password === "";

  return (
    <>
      <h1 className="text-4xl bold">Welcome to Shipment Ltd.</h1>
      <div className="bg-background w-[50em] mx-auto rounded-md p-10 mt-20">
        <h2 className="text-3xl">Sign in</h2>
        <form>
          <div className="form-group mt-10">
            <label className="text-xl" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control ml-10 border w-[20em] h-8 rounded p-2"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={(e) => validateEmail(e.target.value)}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="form-group mt-5">
            <label className="text-xl" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control ml-3 border w-[20em] h-8 rounded p-2"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              onBlur={(e) => validatePassword(e.target.value)}
            />
            {passwordError && (
              <div className="error-message">{passwordError}</div>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-10 bg-primary text-white px-10 py-2 rounded cursor-pointer"
            disabled={isButtonDisabled}
            onClick={handleLogin}
          >
            Continue
          </button>
          <ToastContainer />
        </form>
        <div>
          <p className="mt-5 text-xl">
            Don't have an account?{" "}
            <a href="/" className="underline">
              Register here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
