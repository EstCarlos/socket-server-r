const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  numero: {
    type: Number,
    required: true,
  },
  escritorio: {
    type: Number,
    required: true,
  },
  agente: {
    type: String,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Ti", ticketSchema);
