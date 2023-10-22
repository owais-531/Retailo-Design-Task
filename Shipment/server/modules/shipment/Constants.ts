// Library Imports
import PQueue from "p-queue";

// Schema model Imports
import Shipment from "../../models/Shipment";

const shipmentQueue = new PQueue({ concurrency: 1 });

// Update a shipment by ID and status
const updateShipment = async (id: number, status: string) => {
  const randomDelay = Math.floor(Math.random() * 60) + 1;
  await new Promise((resolve) => setTimeout(resolve, randomDelay * 1000));

  try {
    const shipment = await Shipment.findById(id);
    if (shipment) {
      shipment.status = status;
      await shipment.save();
    }
  } catch (error) {
    console.error("Error updating shipment:", error);
  }
};

export default shipmentQueue;
