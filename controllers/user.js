const express = require("express");
const User = require("../models/user");

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      req.userId = user._id;
      next();
    } else {
      res.status(400).send("Invalid credentials");
    }
    // res.json({
    //   status: 203,
    //   message: "Invalid Login!",
    // });
  } catch (err) {
    next(err);
  }
};
module.exports.logout = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token", {
        httpOnly: true,
        secure: false,
      })
      .send(200)
      .json({
        message: "Logout successfully! ",
      });
  } catch (err) {
    next(err);
  }
};
module.exports.isLoggedIn = async (req, res, next) => {
  try {
    res.json({ status: 200, loggedIn: true, access_token: req.user });
  } catch (err) {
    next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.userId });
    res.send(user);
  } catch (err) {
    next(err);
  }
};
module.exports.updateUser = async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    await User.findOneAndUpdate(
      { _id: req.userId },
      {
        $set: { username, password, email },
      }
    );

    res.send("user updated");
  } catch (err) {
    next(err);
  }
};
