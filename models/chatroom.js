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
        deliveredTo: [{ type: mongoose.Types.ObjectId, ref: "User" }],
        messageType: {
          type: String,
        },
        message: { type: String },
        file: {},
      },
    ],
    lastMsg: {
      sentBy: { type: mongoose.Types.ObjectId, ref: "User" },
      date: { type: Date },
      messageType: {
        type: String,
      },
      message: { type: String },
      file: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chatroom", ChatroomSchema);
