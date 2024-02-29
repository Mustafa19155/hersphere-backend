const Chatroom = require("../models/chatroom");

exports.getChatrooms = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({});
    res.send(chatrooms);
  } catch (error) {
    next(error);
  }
};

exports.getChatroomById = async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOne({
      workplaceID: req.params.id,
    })
      .populate("workplaceID membersID")
      .select("-membersID.password");

    res.send(chatroom);
  } catch (error) {
    next(error);
  }
};

exports.getChatroomsOfUser = async (req, res, next) => {
  try {
    let chatrooms = await Chatroom.find({
      membersID: req.params.userId,
    })
      .populate("workplaceID membersID")
      .select("-membersID.password");

    // add unread messages count field to each chatroom
    chatrooms = chatrooms.map((chatroom) => {
      const unreadMessages = chatroom.chats.filter(
        (chat) =>
          chat.sentBy !== req.params.userId &&
          !chat.readBy.includes(req.params.userId) &&
          chat.deliveredTo.includes(req.params.userId)
      ).length;
      return {
        ...chatroom._doc,
        unreadMessages: unreadMessages,
      };
    });

    res.send(chatrooms);
  } catch (error) {
    next(error);
  }
};
