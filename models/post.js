const mongoose = require("mongoose");

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postID: String,
    platform: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
