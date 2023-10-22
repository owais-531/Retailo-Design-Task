// Library Imports
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Style Imports
import { ToastContainer, toast } from "react-toastify";

// File Imports
import { adminSignupApiCall } from "../../services/authServices";

function Signup() {
  // States
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Error States
  const [userNameError, setuserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Navigate function for routing
  const navigate = useNavigate();

  // Add user in DB
  async function AddUserInDB(e: React.ChangeEvent<any>) {
    e.preventDefault();
    // Validation function calls
    validateuserName(username);
    validateEmail(email);
    validatePassword(password);
    try {
      const data = {
        username: username,
        email: email,
        password: password,
        role: role,
      };
      // Admin Signup API Response
      const requestResponse = await adminSignupApiCall(data);
      if (requestResponse.status == 200) {
        //  Token generation if user is registered
        const token = requestResponse.data.token;
        // Store in localStorage
        localStorage.setItem("token", token);
        showToastMessage();
        await timeout(2000);
        // Naviagte to home
        navigate("/adminhome");
        return data;
      } else {
        showToastMessageError();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error message: ", error.message);
        return error.message;
      } else {
        console.log("unexpected error: ", error);
        return "An unexpected error occurred";
      }
    }
  }

  // Validating Name
  const validateuserName = (value: any) => {
    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!username) {
      setuserNameError("username Required");
    } else if (!userNameRegex.test(value) || username.length < 3) {
      setuserNameError("Invalid username");
    } else {
      setuserNameError("");
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
    } else if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  // Delay function
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // All Toast Messages
  const showToastMessage = () => {
    toast.success("Signup Successful !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessageError = () => {
    toast.error("Signup Failed !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Button disable
  const isButtonDisabled = email === "" || password === "" || password.length < 6 || username === "" || username.length < 3;

  return (
    <>
      <h1 className="text-4xl bold">Welcome to Shipment Ltd.</h1>
      <div className="bg-background w-[50em] mx-auto rounded-md p-10 mt-20">
        <h2 className="text-3xl">Create Account</h2>
        <form>
          <div className="form-group mt-10">
            <label className="text-xl" htmlFor="lastName">
              Username
            </label>
            <input
              type="text"
              className="form-control ml-2 border w-[20em] h-8 rounded p-2"
              id="lastName"
              onChange={(e) => setuserName(e.target.value)}
              onBlur={(e) => validateuserName(e.target.value)}
            />
            {userNameError && (
              <div className="error-message">{userNameError}</div>
            )}
          </div>
          <div className="form-group mt-5">
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
              placeholder="At least 6 characters"
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
            onClick={AddUserInDB}
          >
            Continue
          </button>
          <ToastContainer />
        </form>
        <p className="mt-5 text-xl">
          Already have an account?{" "}
          <a href="/login" className="underline">
            Sign in
          </a>
        </p>
      </div>
    </>
  );
}

export default Signup;
