const {
  model,
  Schema
} = require("mongoose");


const newUserSchema = new Schema({
  userId: {
    type: String,
    required: true,
    uniqueId: null,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

module.exports = model("User", newUserSchema);