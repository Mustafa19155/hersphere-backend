const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["accepted", "rejected", "pending"],
    default: "active",
  },
});

module.exports = mongoose.model("Category", categorySchema);
