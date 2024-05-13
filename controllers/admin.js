const passport = require("passport");
const Admin = require("../models/admin");
const User = require("../models/user");
const Job = require("../models/job");
const Category = require("../models/category");

exports.login = async (req, res, next) => {
  try {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        next(err);
      }
      if (!user) {
        return res.status(400).json({ message: info.message });
      }
      req.logIn(user, (err) => {
        if (err) {
          next(err);
        }
        return res.status(200).json({ message: "Login successful" });
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.logout((err) => {
      if (err) {
        next(err);
      }
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
};

exports.checkLogin = async (req, res, next) => {
  try {
    if (req.isAuthenticated()) {
      return res.status(200).json({ message: "User is logged in" });
    }
    return res.status(400).json({ message: "User is not logged in" });
  } catch (err) {
    next(err);
  }
};

exports.getAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user._id);
    return res.status(200).json(admin);
  } catch (err) {
    next(err);
  }
};

exports.updateAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.user._id, req.body);
    return res.status(200).json({ message: "Admin updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.blockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { blocked: true });
    return res.status(200).json({ message: "User blocked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.unblockUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      blocked: false,
    });
    return res.status(200).json({ message: "User unblocked successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

exports.acceptCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      status: "accepted",
    });
    return res.status(200).json({ message: "Category accepted" });
  } catch (err) {
    next(err);
  }
};

exports.rejectCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, {
      status: "rejected",
    });
    return res.status(200).json({ message: "Category rejected" });
  } catch (err) {
    next(err);
  }
};
