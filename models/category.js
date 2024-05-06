const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending", "active"],
    default: "active",
  },
});

module.exports = mongoose.model("Category", categorySchema);
