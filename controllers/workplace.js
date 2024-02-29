const Workplace = require("../models/workplace");
const Chatroom = require("../models/chatroom");

// Create a new workplace
exports.createWorkplace = async (req, res, next) => {
  try {
    const { userId } = req;

    const workplaceFound = await Workplace.findOne({
      name: req.body.name,
      createdBy: userId,
    });

    if (workplaceFound) {
      return res.status(400).send("Workplace already exists");
    }

    const workplace = await Workplace.create({
      ...req.body,
      createdBy: userId,
    });

    await Chatroom.create({
      workplaceID: workplace._id,
      membersID: [userId],
      chats: [],
    });

    res.status(201).json(workplace);
  } catch (error) {
    next(error);
  }
};

// Get all workplaces of user
exports.getUserWorkplaces = async (req, res, next) => {
  try {
    const { userId } = req;

    const workplaces = await Workplace.find({ createdBy: userId });
    res.status(200).json(workplaces);
  } catch (error) {
    next(error);
  }
};

// Get a specific workplace by ID
exports.getWorkplaceById = async (req, res, next) => {
  try {
    const { userId } = req;
    const workplace = await Workplace.findOne({
      _id: req.params.id,
      createdBy: userId,
    });
    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }
    res.status(200).json(workplace);
  } catch (error) {
    next(error);
  }
};

// Update a workplace by ID
exports.updateWorkplaceById = async (req, res, next) => {
  try {
    const { userId } = req;
    const workplace = await Workplace.findByOneAndUpdate(
      { _id: req.params.id, createdBy: userId },
      req.body,
      { new: true }
    );
    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }
    res.status(200).json(workplace);
  } catch (error) {
    next(error);
  }
};

// Delete a workplace by ID
exports.deleteWorkplaceById = async (req, res, next) => {
  try {
    const { userId } = req;
    const workplace = await Workplace.findOneAndDelete({
      _id: req.params.id,
      createdBy: userId,
    });
    if (!workplace) {
      return res.status(404).json({ message: "Workplace not found" });
    }
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};
