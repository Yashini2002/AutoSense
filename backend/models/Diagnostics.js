import mongoose from "mongoose";

const diagnosticsSchema = new mongoose.Schema({
  vehicleId: String,
  metric: String,
  value: Number,
  timestamp: Date,
});

export const Diagnostics = mongoose.model("Diagnostics", diagnosticsSchema);
