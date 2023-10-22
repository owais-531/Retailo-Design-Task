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
// Library Imports
const p_queue_1 = __importDefault(require("p-queue"));
// Schema model Imports
const Shipment_1 = __importDefault(require("../../models/Shipment"));
const shipmentQueue = new p_queue_1.default({ concurrency: 1 });
// Update a shipment by ID and status
const updateShipment = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    const randomDelay = Math.floor(Math.random() * 60) + 1;
    yield new Promise((resolve) => setTimeout(resolve, randomDelay * 1000));
    try {
        const shipment = yield Shipment_1.default.findById(id);
        if (shipment) {
            shipment.status = status;
            yield shipment.save();
        }
    }
    catch (error) {
        console.error("Error updating shipment:", error);
    }
});
exports.default = shipmentQueue;
