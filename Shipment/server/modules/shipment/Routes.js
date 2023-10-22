"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const express_1 = __importDefault(require("express"));
// File Imports
const Controller_1 = require("./Controller");
// Defining Shipment router
const ShipmentRouter = express_1.default.Router();
// Define routes for API end points
ShipmentRouter.post("/add", Controller_1.addShipment);
ShipmentRouter.get("/getall", Controller_1.getShipments);
ShipmentRouter.delete("/remove/:id", Controller_1.removeShipment);
ShipmentRouter.post("/update/:id/:status", Controller_1.updateShipment);
exports.default = ShipmentRouter;
