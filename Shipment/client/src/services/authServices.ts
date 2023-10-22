// Library imports
import axios from "axios";

// Variables
const BASE_URL = "http://localhost:3001";

/**
 * Admin Signup API Call
 */
const adminSignupApiCall = async (values: any) => {
  const url = BASE_URL + "/user/signup";
  const data = {
    username: values.username,
    email: values.email,
    password: values.password,
    role: "Admin",
  };
  const response = await axios.post(url, data).catch((err) => {
    return err;
  });
  return response;
};

/**
 * Login API Call
 */
const userLoginApiCall = async (values: any) => {
  const url = BASE_URL + "/user/login";
  const data = {
    email: values.email,
    password: values.password,
  };
  const response = await axios.post(url, data).catch((err) => {
    return err;
  });
  return response;
};

/**
 * Worker signup API Call
 */
const workerSignupApiCall = async (values: any) => {
  const url = BASE_URL + "/user/addworker";
  const data = {
    username: values.username,
    email: values.email,
    password: values.password,
    role: "Worker",
  };
  const response = await axios.post(url, data).catch((err) => {
    return err;
  });
  return response;
};

export { adminSignupApiCall, userLoginApiCall, workerSignupApiCall };
