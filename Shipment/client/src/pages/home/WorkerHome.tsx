// Library Imports
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Interface
interface Shipment {
  _id: string;
  id: number;
  status: string;
}

const WorkerHome = () => {
  // States
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const BASE_URL = "http://localhost:3001";

  /**
   * Get all shipments API Call
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
   * Update Shipment API Call
   */
  const handleUpdate = async (_id: string, status: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}/shipment/update/${_id}/${status}`
      );
      console.log(response.data);
      setTimeout(() => {
        // Simulate the update process
        const updatedShipments = shipments.map((shipment) =>
          shipment._id === _id ? { ...shipment, status: "Updated" } : shipment
        );
        setShipments(updatedShipments);
      }, 2000);
      window.location.reload();
    } catch (error) {
      console.error("Error updating shipment:", error);
      setLoading(false);
    }
  };

  // Logout function
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <h1 className="text-3xl font-semibold">Worker Home</h1>
      <button
        className="mt-10 mx-3 bg-primary text-white px-10 py-2 rounded cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
      <div className="bg-background p-5 mt-10">
        <h2 className="text-xl font-semibold">All Shipments</h2>
        <div className="flex p-2 mt-5">
          <p className="w-1/3 text-xl font-semibold">Shipment ID</p>
          <p className="w-1/3 text-xl font-semibold">Status</p>
        </div>
        <div className="flex flex-col h-80 overflow-y-auto">
          {shipments.map((shipment) => (
            <div className="flex mt-5" key={shipment._id}>
              <p className="w-1/3">{shipment.id}</p>
              <p className="w-1/3">{shipment.status}</p>
              <button
                className="mx-[7em] bg-primary text-white px-5 py-1 rounded cursor-pointer"
                onClick={() => handleUpdate(shipment._id, shipment.status)}
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : "Update"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WorkerHome;
