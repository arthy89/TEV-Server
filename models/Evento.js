import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    tipo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org",
      required: true,
    },
    lugar: {
      type: String,
      required: true,
    },
    fecha: {
      type: Date,
      required: true,
    },
    hora: {
      type: Date,
      required: true,
    },
    estado: {
      type: String,
    },
    // imgUrl: {
    //   type: String,
    //   // no requerido para actualizar luego
    // },
    // rutaUrl: {
    //   type: String
    // },
    resultado: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Evento", eventoSchema);
