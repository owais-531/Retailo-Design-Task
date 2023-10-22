import axios from "axios";

const BASE_URL = "http://localhost:3001";

const addShipment = async () => {
  const url = BASE_URL + "/shipment/add";
  try {
    const shipmentData = {
      status: "Pending",
    };

    const response = await axios.post(url, shipmentData);

    return response;
  } catch (error) {
    throw error;
  }
};

export { addShipment };
