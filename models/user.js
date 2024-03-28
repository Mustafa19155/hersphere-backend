const mongoose = require("mongoose");

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    facebookPage: {},
    instagramPage: {},
    youtubeChannel: {},
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
    isVerified: {
      type: Boolean,
      default: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    skills: [],
    businessDetails: {},
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", ProductSchema);
