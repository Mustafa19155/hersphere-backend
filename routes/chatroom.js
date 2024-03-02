const chatroomCOntroller = require("../controllers/chatroom");
const chatroomRouter = require("express").Router();
const Chatroom = require("../models/chatroom");
const io = require("../app");

io.of("/chatroom").on("connection", (socket) => {
  console.log("New client connected");

  socket.on("join", (data) => {
    socket.join(data.room);
  });

  socket.on("message", (data) => {
    // get all users who have joined the room
    // const users = io.of("/chatroom").adapter.rooms.get(data.room);
    // console.log(users);

    // save message to database

    const newMessage = {
      sentBy: data.message.sentBy,
      date: data.message.date,
      messageType: data.message.messageType,
      message: data.message.text,
      file: data.message.file,
      readBy: [data.message.sentBy],
      deliveredTo: data.message.deliveredTo,
    };

    Chatroom.findOneAndUpdate(
      { workplaceID: data.room },
      {
        $push: { chats: newMessage },
        lastMsg: newMessage,
      },
      { new: true }
    )
      .then((chatroom) => {})
      .catch((err) => {});

    io.of("/chatroom").to(data.room).emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// GET /api/chatroom
chatroomRouter.get("/", chatroomCOntroller.getChatrooms);

// get chatroom by id
chatroomRouter.get("/:id", chatroomCOntroller.getChatroomById);

// get chatrooms of user
chatroomRouter.get("/user/:userId", chatroomCOntroller.getChatroomsOfUser);

module.exports = chatroomRouter;