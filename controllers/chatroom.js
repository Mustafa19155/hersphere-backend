const Chatroom = require("../models/chatroom");
const Job = require("../models/job");
const Workplace = require("../models/workplace");
const Review = require("../models/review");

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
    let canDelete = true;

    const chatroom = await Chatroom.findOne({
      workplaceID: req.params.id,
    })
      .populate("workplaceID membersID chats.sentBy")
      .select("-membersID.password");

    if (!chatroom) {
      return res.status(404).send({ message: "Chatroom not found" });
    }

    let job = await Job.findOne({
      workplaceID: req.params.id,
      employee: { $exists: true },
    });

    if (job) {
      canDelete = false;
    }

    for (let i = 0; i < chatroom.membersID.length; i++) {
      const member = chatroom.membersID[i];

      // find job with the same workplaceID and userID
      const job = await Job.findOne({
        workplaceID: req.params.id,
        "employee.userID": member._id,
      });

      if (job) {
        const review = await Review.findOne({ jobID: job._id });

        // Update the job property for the member
        chatroom.membersID[i] = {
          ...member._doc,
          job: { ...job._doc, review },
        };
      }
    }

    res.send({ ...chatroom._doc, canDelete });
  } catch (error) {
    next(error);
  }
};

exports.getChatroomsOfUser = async (req, res, next) => {
  try {
    let chatrooms = await Chatroom.find({
      workplaceID: { $exists: true },
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

exports.readMessages = async (req, res, next) => {
  try {
    const { userId } = req;
    const chatroom = await Chatroom.findOne({
      workplaceID: req.params.id,
    });

    if (!chatroom) {
      return res.status(404).send({ message: "Chatroom not found" });
    }

    chatroom.chats.forEach((chat) => {
      if (
        chat.sentBy !== userId &&
        !chat.readBy.includes(userId) &&
        chat.deliveredTo.includes(userId)
      ) {
        chat.readBy.push(userId);
      }
    });

    await chatroom.save();

    res.send(chatroom);
  } catch (error) {
    next(error);
  }
};

exports.getUserChat = async (req, res, next) => {
  try {
    const { id } = req.params;

    const chatroom = await Chatroom.findOne({
      workplaceID: { $exists: false },
      // _id: id,
      membersID: { $all: [req.userId, id] },
    })
      .populate("membersID chats.sentBy")
      .select("-membersID.password");
    // const chatroom = await Chatroom.findOne({
    //   workplaceID: { $exists: false },
    //   _id: id,
    //   // membersID: [req.userId, id],
    // })
    //   .populate("membersID chats.sentBy")
    //   .select("-membersID.password");
    if (!chatroom) {
      // create a new chatroom
      let newChatroom = new Chatroom({
        membersID: [req.userId, id],
        messages: [],
        lastMsg: null,
      });

      await newChatroom.save();

      newChatroom = await Chatroom.findOne({
        _id: newChatroom._id,
      })
        .populate("membersID chats.sentBy")
        .select("-membersID.password");

      return res.send(newChatroom);
    }

    return res.send(chatroom);
  } catch (error) {
    next(error);
  }
};

exports.getUserChats = async (req, res, next) => {
  try {
    const chatrooms = await Chatroom.find({
      workplaceID: { $exists: false },
      "lastMsg.messageType": { $exists: true },
      membersID: req.userId,
    })
      .populate("membersID chats.sentBy")
      .select("-membersID.password")
      .sort({ "lastMsg.date": -1 });

    res.send(
      chatrooms
        .filter((chat) => chat.membersID.length > 1)
        .map((chatroom) => {
          return {
            ...chatroom._doc,
            name: chatroom.membersID.find(
              (member) => member._id.toString() !== req.userId
            ).username,
            unreadMessages: chatroom.chats.filter(
              (chat) =>
                chat.sentBy !== req.userId &&
                !chat.readBy.includes(req.userId) &&
                chat.deliveredTo.includes(req.userId)
            ).length,
          };
        })
    );
  } catch (error) {
    next(error);
  }
};

exports.deleteChatroom = async (req, res, next) => {
  try {
    const chatroom = await Chatroom.findOne({
      workplaceID: req.params.id,
    });

    if (!chatroom) {
      return res.status(404).send({ message: "Chatroom not found" });
    }

    // delete workplace
    await Workplace.findByIdAndDelete(req.params.id);

    await chatroom.remove();

    res.send({ message: "Chatroom deleted successfully" });
  } catch (error) {
    next(error);
  }
};

exports.getRecentChats = async (req, res, next) => {
  try {
    console.log(req.userId);
    const chatrooms = await Chatroom.find({
      workplaceID: { $exists: false },
      "lastMsg.messageType": { $exists: true },
      membersID: req.userId,
    })
      .populate("membersID chats.sentBy")
      .select("-membersID.password")
      .sort({ "lastMsg.date": -1 })
      .limit(3);

    res.send(
      chatrooms
        .filter((chat) => chat.membersID.length > 1)
        .map((chatroom) => {
          return {
            ...chatroom._doc,
            name: chatroom.membersID.find(
              (member) => member._id.toString() !== req.userId
            ).username,
            unreadMessages: chatroom.chats.filter(
              (chat) =>
                chat.sentBy !== req.userId &&
                !chat.readBy.includes(req.userId) &&
                chat.deliveredTo.includes(req.userId)
            ).length,
          };
        })
    );
  } catch (error) {
    next(error);
  }
};
