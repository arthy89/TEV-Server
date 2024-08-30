import mongoose from "mongoose";

const shkSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    distancia: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Shakedown", shkSchema);