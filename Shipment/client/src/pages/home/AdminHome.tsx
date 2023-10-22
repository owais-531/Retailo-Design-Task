// Library Imports
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

// File Imports
import { workerSignupApiCall } from "../../services/authServices";
import { addShipment } from "../../services/shipmentServices";

// Interfaces
interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface Shipment {
  _id: string;
  id: number;
  status: string;
}

function AdminHome() {
  // States
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("");

  // Error States
  const [userNameError, setuserNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Data states
  const [workers, setWorkers] = useState<User[]>([]);
  const [shipments, setShipments] = useState<Shipment[]>([]);

  // Variables
  const BASE_URL = "http://localhost:3001";

  useEffect(() => {
    /**
     * Get all workers API call
     */
    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/getall`);
        if (Array.isArray(response.data.workers)) {
          setWorkers(response.data.workers as User[]);
        } else {
          console.error("Invalid API response:", response);
        }
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
    };

    fetchWorkers();
  }, []);

  /**
   * Delete User API Call
   */
  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`${BASE_URL}/user/remove/${userId}`);
      showDeleteToastMessage();
      await timeout(2000);
      setWorkers((prevWorkers) =>
        prevWorkers.filter((user) => user._id !== userId)
      );
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  /**
   * Get all Shipments API Call
   */
  const fetchShipments = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/shipment/getall`);
      if (Array.isArray(response.data.shipments)) {
        setShipments(response.data.shipments as Shipment[]);
      } else {
        console.error("Invalid API response:", response);
      }
    } catch (error) {
      console.error("Error fetching shipments:", error);
    }
  };

  useEffect(() => {
    fetchShipments();
  }, []);

  /**
   * Delete Shipment API Call 
   */
  const deleteShipment = async (shipmentId: string) => {
    try {
      await axios.delete(`${BASE_URL}/shipment/remove/${shipmentId}`);
      showDeleteToastMessage();
      await timeout(2000);
      fetchShipments();
      window.location.reload();
    } catch (error) {
      console.error("Error deleting shipment:", error);
    }
  };

  /**
   * Add Worker API Call
   */
  async function AddWorkerInDB(e: React.ChangeEvent<any>) {
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
      const requestResponse = await workerSignupApiCall(data);
      if (requestResponse.status == 200) {
        console.log(JSON.stringify(data, null, 4));
        const token = requestResponse.data.token;
        localStorage.setItem("token", token);
        showToastMessage();
        await timeout(2000);
        window.location.reload();
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

  /**
   * Add Shipment API Call
   */
  const AddShipmentInDB = async () => {
    try {
      const response = await addShipment();
      console.log(response);
      if (response.status == 200) {
        showShipmentToastMessage();
        await timeout(2000);
        window.location.reload();
      } else if (response.status == 500) {
        showShipmentToastMessageError();
      }
    } catch (error) {
      console.error("Error adding shipment:", error);
    }
  };

  // Validating Name
  const validateuserName = (value: any) => {
    const userNameRegex = /^[a-zA-Z0-9_]+$/;
    if (!username) {
      setuserNameError("Name Required");
    } else if (!userNameRegex.test(value) || username.length < 3) {
      setuserNameError("Invalid Name");
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

  // Logout function
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Delay function
  function timeout(delay: number) {
    return new Promise((res) => setTimeout(res, delay));
  }

  // All Toast messages
  const showToastMessage = () => {
    toast.success("Worker Added !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showToastMessageError = () => {
    toast.error("Worker Not Added !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showShipmentToastMessage = () => {
    toast.success("Shipment Added !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showShipmentToastMessageError = () => {
    toast.error("Shipment Not Added !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showDeleteToastMessage = () => {
    toast.success("Delete Successful !", {
      autoClose: 1000,
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  // Open and Close form states update
  const handleOpenForm = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  // Button disable
  const isButtonDisabled = email === "" || password === "" || password.length < 6 || username === "" || username.length < 3;

  return (
    <>
      <h2 className="text-3xl bold">Welcome to Shipments Ltd.</h2>
      <button
        className="mt-10 mx-3 bg-primary text-white px-10 py-2 rounded cursor-pointer"
        onClick={handleOpenForm}
      >
        Add Worker
      </button>
      <button
        className="mt-10 mx-3 bg-primary text-white px-10 py-2 rounded cursor-pointer"
        onClick={AddShipmentInDB}
      >
        Add Shipment
      </button>
      <button
        className="mt-10 mx-3 bg-primary text-white px-10 py-2 rounded cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>

      {isFormOpen && (
        <div className="popup">
          <form>
            <div className="form-group mt-5">
              <label htmlFor="lastName">Name</label>
              <input
                type="text"
                className="form-control ml-10 border w-[20em] h-8 rounded p-2"
                id="lastName"
                onChange={(e) => setuserName(e.target.value)}
                onBlur={(e) => validateuserName(e.target.value)}
              />
              {userNameError && (
                <div className="error-message">{userNameError}</div>
              )}
            </div>
            <div className="form-group mt-5">
              <label htmlFor="email">Email</label>
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
              <label htmlFor="password">Password</label>
              <input
                type="password"
                placeholder="At least 6 characters"
                className="form-control ml-5 border w-[20em] h-8 rounded p-2"
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
              className="btn btn-primary mt-5 mx-3 bg-primary text-white px-5 py-1 rounded cursor-pointer"
              disabled={isButtonDisabled}
              onClick={AddWorkerInDB}
            >
              Add
            </button>
            <button
              onClick={handleCloseForm}
              className="close-button mt-5 mx-3 bg-primary text-white px-5 py-1 rounded cursor-pointer"
            >
              Close
            </button>
          </form>
        </div>
      )}
      <div className="bg-background rounded mt-10 flex flex-col p-5">
        <h2 className="text-2xl font-semibold">All Workers</h2>
        <div className="flex p-2 mt-5">
          <p className="w-1/4 text-xl font-semibold">Name</p>
          <p className="w-1/4 text-xl font-semibold">Email</p>
          <p className="w-1/4 text-xl font-semibold">Role</p>
        </div>
        <div className="flex flex-col h-40 overflow-y-auto">
          {workers.map((worker) => (
            <div className="flex mt-5" key={worker._id}>
              <p className="w-1/4">{worker.username}</p>
              <p className="w-1/4">{worker.email}</p>
              <p className="w-1/4">{worker.role}</p>
              <button
                className="mx-3 bg-primary text-white px-5 py-1 rounded cursor-pointer"
                onClick={() => handleDeleteUser(worker._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-background rounded mt-10 flex flex-col p-5">
        <h2 className="text-2xl font-semibold">All Shipments</h2>
        <div className="flex p-2 mt-5">
          <p className="w-1/3 text-xl font-semibold">Shipment ID</p>
          <p className="w-1/3 text-xl font-semibold">Status</p>
        </div>
        <div className="flex flex-col h-40 overflow-y-auto">
          {shipments.map((shipment) => (
            <div className="flex mt-5" key={shipment._id}>
              <p className="w-1/3">{shipment.id}</p>
              <p className="w-1/3">{shipment.status}</p>
              <button
                className="mx-[7em] bg-primary text-white px-5 py-1 rounded cursor-pointer"
                onClick={() => deleteShipment(shipment._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default AdminHome;
