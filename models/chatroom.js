const mongoose = require("mongoose");

const { Schema } = mongoose;

const ChatroomSchema = new Schema(
  {
    workplaceID: {
      type: mongoose.Types.ObjectId,
      ref: "Workplace",
    },
    membersID: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    chats: [
      {
        sentBy: { type: mongoose.Types.ObjectId, ref: "User" },
        date: { type: Date },
        readBy: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        messageType: {
          type: String,
        },
        text: { type: String },
        document: { type: String },
        image: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", ChatroomSchema);
