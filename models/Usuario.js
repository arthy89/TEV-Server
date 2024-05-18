import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true, // para quitar espacios innecesarios
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rol",
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org",
      required: true,
    },
    expiresAccessAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Usuario", usuarioSchema);
