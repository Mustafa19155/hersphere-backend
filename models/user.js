const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema({
  profileImage: String,
  userType: String,
  username: String,
  profileCompleted: Boolean,
  source: {
    type: String,
    default: "",
  },
  email: String,
  password: String,
  businessDetails: {},
});

module.exports = mongoose.model("User", ProductSchema);
