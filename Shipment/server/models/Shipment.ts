// Library Imports
import mongoose from "mongoose";

// Shipment schema
const shipmentSchema = new mongoose.Schema({
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

const Shipment = mongoose.model("Shipment", shipmentSchema);

export default Shipment;
