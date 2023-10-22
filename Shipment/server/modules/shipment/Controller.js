"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateShipment = exports.removeShipment = exports.getShipments = exports.addShipment = void 0;
// Schema model Imports
const Shipment_1 = __importDefault(require("../../models/Shipment"));
// Function to generate the next unique ID
const getNextUniqueID = () => __awaiter(void 0, void 0, void 0, function* () {
    const shipment = yield Shipment_1.default.findOne().sort("-id");
    return shipment ? shipment.id + 1 : 1;
});
/**
 * Add Shipment API
 */
const addShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const id = yield getNextUniqueID();
        const shipment = new Shipment_1.default({ id, status });
        yield shipment.save();
        res
            .status(200 /* StatusCodes.SUCCESS */)
            .json({ message: "Action completed successfully" /* Messages.ACTION_SUCCESS */, shipment });
    }
    catch (error) {
        console.error(error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.addShipment = addShipment;
/**
 * Get all shipments API
 */
const getShipments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shipments = yield Shipment_1.default.find();
        res.json({ shipments });
    }
    catch (error) {
        console.error("Error fetching shipments:", error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.getShipments = getShipments;
/**
 * Remove shipment API
 */
const removeShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const shipmentId = req.params.id;
    try {
        const deletedShipment = yield Shipment_1.default.findByIdAndRemove(shipmentId);
        if (!deletedShipment) {
            return res
                .status(404 /* StatusCodes.NOTFOUND */)
                .json({ message: "Not found" /* Messages.NOT_FOUND */ });
        }
        res.json({ message: "Action completed successfully" /* Messages.ACTION_SUCCESS */ });
    }
    catch (error) {
        console.error("Error deleting shipment:", error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.removeShipment = removeShipment;
/**
 * Update shipment API
 */
const updateShipment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = req.params;
    try {
        const randomTimeout = Math.floor(Math.random() * 10) * 1000;
        // Delay based randomTimeout
        yield new Promise((resolve) => setTimeout(resolve, randomTimeout));
        // Update shipment status
        const shipment = yield Shipment_1.default.findByIdAndUpdate(id, { status: "Shipped" }, { new: true });
        if (!shipment) {
            return res
                .status(404 /* StatusCodes.NOTFOUND */)
                .json({ message: "Not found" /* Messages.NOT_FOUND */ });
        }
        res
            .status(200 /* StatusCodes.SUCCESS */)
            .json({ message: "Action completed successfully" /* Messages.ACTION_SUCCESS */, shipment });
    }
    catch (error) {
        console.error("Error:", error);
        res
            .status(500 /* StatusCodes.SERVERERROR */)
            .json({ message: "Internal server error" /* Messages.SERVER_ERROR */ });
    }
});
exports.updateShipment = updateShipment;
