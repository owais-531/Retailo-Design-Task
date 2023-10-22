"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Library Imports
const mongoose_1 = __importDefault(require("mongoose"));
// Shipment schema
const shipmentSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        unique: true,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});
const Shipment = mongoose_1.default.model("Shipment", shipmentSchema);
exports.default = Shipment;
