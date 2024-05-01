const {
    model,
    Schema
  } = require("mongoose");
  
  
  const newVentaSchema = new Schema({
    ventaId: {
      type: String,
      required: true,
    },
    monto: {
      type: String,
      required: true,
    },
    metodoPago: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    atendio: {
      type: String,
      required: true,
    },
    detalles: {
      type: String,
      required: true,
    },
    notas: {
      type: String,
    }
  }, {
    timestamps: true,
  })
  
  module.exports = model("Venta", newVentaSchema);