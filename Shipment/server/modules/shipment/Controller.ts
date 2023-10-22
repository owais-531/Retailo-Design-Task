// Library Imports
import { Request, Response } from "express";

// File Imports
import StatusCodes from "../../config/StatusCodes";
import Messages from "../../config/Messages";

// Schema model Imports
import Shipment from "../../models/Shipment";

// Function to generate the next unique ID
const getNextUniqueID = async () => {
  const shipment = await Shipment.findOne().sort("-id");
  return shipment ? shipment.id + 1 : 1;
};

/**
 * Add Shipment API
 */
const addShipment = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const id = await getNextUniqueID();
    const shipment = new Shipment({ id, status });
    await shipment.save();

    res
      .status(StatusCodes.SUCCESS)
      .json({ message: Messages.ACTION_SUCCESS, shipment });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Get all shipments API
 */
const getShipments = async (req: Request, res: Response) => {
  try {
    const shipments = await Shipment.find();
    res.json({ shipments });
  } catch (error) {
    console.error("Error fetching shipments:", error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Remove shipment API
 */
const removeShipment = async (req: Request, res: Response) => {
  const shipmentId = req.params.id;

  try {
    const deletedShipment = await Shipment.findByIdAndRemove(shipmentId);

    if (!deletedShipment) {
      return res
        .status(StatusCodes.NOTFOUND)
        .json({ message: Messages.NOT_FOUND });
    }

    res.json({ message: Messages.ACTION_SUCCESS });
  } catch (error) {
    console.error("Error deleting shipment:", error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

/**
 * Update shipment API
 */
const updateShipment = async (req: Request, res: Response) => {
  const { id, status } = req.params;

  try {
    const randomTimeout = Math.floor(Math.random() * 10) * 1000;

    // Delay based randomTimeout
    await new Promise((resolve) => setTimeout(resolve, randomTimeout));

    // Update shipment status
    const shipment = await Shipment.findByIdAndUpdate(
      id,
      { status: "Shipped" },
      { new: true }
    );

    if (!shipment) {
      return res
        .status(StatusCodes.NOTFOUND)
        .json({ message: Messages.NOT_FOUND });
    }

    res
      .status(StatusCodes.SUCCESS)
      .json({ message: Messages.ACTION_SUCCESS, shipment });
  } catch (error) {
    console.error("Error:", error);
    res
      .status(StatusCodes.SERVERERROR)
      .json({ message: Messages.SERVER_ERROR });
  }
};

export { addShipment, getShipments, removeShipment, updateShipment };
