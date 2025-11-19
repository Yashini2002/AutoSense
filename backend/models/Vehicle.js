import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  vehicleId: String,
  model: String,
  status: String,
  lastCheck: Date,
});

export const Vehicle = mongoose.model("Vehicle", vehicleSchema);
