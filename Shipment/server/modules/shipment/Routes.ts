// Library Imports
import express from "express";

// File Imports
import {
  addShipment,
  getShipments,
  updateShipment,
  removeShipment,
} from "./Controller";

// Defining Shipment router
const ShipmentRouter = express.Router();

// Define routes for API end points
ShipmentRouter.post("/add", addShipment);
ShipmentRouter.get("/getall", getShipments);
ShipmentRouter.delete("/remove/:id", removeShipment);
ShipmentRouter.post("/update/:id/:status", updateShipment);

export default ShipmentRouter;
