const express = require("express");
const User = require("../models/user");
const axios = require("axios");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");
const fs = require("fs").promises;

exports.getFacebookPages = async (req, res, next) => {
  try {
    const { token, userType } = req.query;

    const response = await axios.get(
      "https://graph.facebook.com/v12.0/me/accounts?fields=name,access_token,media_count,followers_count,tasks,id",
      {
        params: {
          access_token: token,
        },
      }
    );

    let pages = response.data.data;

    const finalPages = [];

    await Promise.all(
      pages.map(async (page) => {
        const found = await User.findOne({ "facebookPage.id": page.id });
        if (!found) {
          finalPages.push(page);
        }
      })
    );

    // filter pages based on no of posts and no of followers

    // if (userType == "influencer") {
    // pages = pages.filter((page) => page.followers_count > 100);
    // } else {
    // for (const page of pages) {
    //   const res = await axios.get(
    //     `https://graph.facebook.com/v12.0/${page.id}?fields=posts&access_token=${page.access_token}`
    //   );
    //   page["totalPosts"] = res.data.posts.data.length;
    // }
    // pages = pages.filter((post) => post.totalPosts > 20);
    // }
    res.send(finalPages);
  } catch (err) {
    next(err);
  }
};

exports.getInstagramPages = async (req, res, next) => {
  try {
    const { token, userType } = req.query;

    const response = await axios.get(
      "https://graph.facebook.com/v12.0/me/accounts?fields=instagram_business_account{id,username}&access_token={access_token}",
      {
        params: {
          access_token: token,
        },
      }
    );

    let pages = response.data.data;
    pages = pages.filter((page) => page.instagram_business_account);

    pages = pages.map((page) => {
      return {
        id: page.instagram_business_account.id,
        username: page.instagram_business_account.username,
      };
    });

    const finalPages = [];

    await Promise.all(
      pages.map(async (page) => {
        const found = await User.findOne({ "instagramPage.id": page.id });
        if (!found) {
          finalPages.push(page);
        }
      })
    );

    for (const page of finalPages) {
      const res = await axios.get(
        `https://graph.facebook.com/v12.0/${page.id}?fields=media_count,followers_count&access_token=${token}`
      );
      page["token"] = token;
      page["id"] = page.id;
      page["name"] = page.username;
      page["media_count"] = res.data.media_count;
      page["followers_count"] = res.data.followers_count;

      delete page["instagram_business_account"];
    }

    // filter pages based on no of posts and no of followers

    // if (userType == "influencer") {
    // pages = pages.filter((page) => page.followers_count > 100);
    // } else {
    // pages = pages.filter((post) => post.totalPosts > 20);
    // }
    res.send(finalPages);
  } catch (err) {
    next(err);
  }
};

exports.getYoutubeDetails = (req, res, next) => {
  const { access_token, userType } = req.query;
  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({
    access_token,
  });

  // const people = google.people({
  //   version: "v1",
  //   auth: oauth2Client,
  // });

  // people.people.get(
  //   {
  //     resourceName: "people/me",
  //     personFields: "genders",
  //   },
  //   (err, res) => {
  //     const gender = res.data;
  //   }
  // );

  const youtube = google.youtube({
    version: "v3",
    auth: oauth2Client,
  });
  youtube.channels.list(
    {
      mine: true,
      part: "snippet,contentDetails,statistics",
      // key: process.env.GOOGLE_API_KEY,
    },
    async (err, response) => {
      if (err) {
        next({
          status: 400,
          message: "Channel not found",
        });
      } else {
        const channelId = response.data.items[0].id;

        const channelFound = await User.findOne({
          "youtubeChannel.id": channelId,
        });

        if (channelFound && channelFound._id != req.userId) {
          next({
            status: 400,
            message: "Channel already connected to another account",
          });
        }

        youtube.search
          .list({
            part: "snippet",
            channelId: channelId,
            order: "date",
            maxResults: 5,
          })
          .then((videosResponse) => {
            const latestVideos = videosResponse.data.items;
            latestVideos.forEach((video) => {
              const videoId = video.id.videoId;
              youtube.videos.list(
                {
                  part: "snippet,statistics", // Include 'statistics' part
                  id: videoId,
                },
                (err, videoResponse) => {
                  if (err) {
                    console.error("Error retrieving video details:", err);
                    return;
                  }

                  const videoDetails = videoResponse.data.items[0].snippet;
                  const videoStats = videoResponse.data.items[0].statistics;
                }
              );
            });
            const data = response.data.items[0];
            res.json({ id: data.id, stats: data.statistics });
          })
          .catch((err) => {});
      }
    }
  );
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      user.password = undefined;
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    next(error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const data = req.body;

    const foundUser = await User.findOne({ email: data.email });

    if (foundUser) {
      return res.status(401).send("User already exists");
    }

    data["password"] = bcrypt.hashSync(data.password, 8);

    const user = new User(req.body);

    await user.save();

    let token;
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    user.password = undefined;
    user["token"] = token;
    return res.send({ user });
  } catch (err) {
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(404).send("User not found");
    }

    const matchPass = bcrypt.compareSync(password, foundUser.password);

    if (!matchPass) {
      return res.status(401).send("Incorrect Password");
    }

    let token;
    token = jwt.sign(
      { userId: foundUser._id, email: foundUser.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    // res.cookie("jwt", token, {
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: false,
    // });

    const user = { ...foundUser._doc };
    user["token"] = token;
    user.password = undefined;
    return res.send(user);
  } catch (err) {
    next(err);
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const data = req.body;
    if (data.businessDetails && data.businessDetails.title) {
      const userFound = await User.findOne({
        "businessDetails.title": data.businessDetails.title,
      });

      if (userFound && userFound._id != req.userId)
        return next({ status: 400, message: "Title not availble" });
    }

    await User.findByIdAndUpdate(req.userId, data);
    res.send("User updated");
  } catch (err) {
    next(err);
  }
};
exports.loginWithGoogle = async (req, res, next) => {
  try {
    const data = req.body;
    data["isVerified"] = true;
    const foundUser = await User.findOne({ email: data.email });

    let token;

    if (foundUser) {
      token = jwt.sign(
        { userId: foundUser._id, email: foundUser.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const user = { ...foundUser._doc };
      user["token"] = token;
      return res.send(user);
    } else {
      const user = new User(data);

      await user.save();

      token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      const userCopy = { ...user._doc };

      userCopy["token"] = token;

      return res.send(userCopy);
    }
  } catch (err) {
    next(err);
  }
};
exports.updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.userId);

    if (bcrypt.compareSync(currentPassword, user.password)) {
      user.password = bcrypt.hashSync(newPassword, 8);

      await user.save();
      return res.send("Password Updated");
    } else {
      return res.status(400).send("Incorrect Password");
    }
  } catch (error) {
    next(error);
  }
};
exports.verifyGender = async (req, res, next) => {
  try {
    const model = await tf.loadLayersModel(
      "file://trained-modals/gender_recognition/model.json"
    );

    const processedImageBuffer = await sharp(req.file.buffer)
      .resize(250, 250)
      .toBuffer();

    const processedImage = tf.node.decodeImage(processedImageBuffer, 3);

    const expandedImage = processedImage.expandDims();

    const normalizedImage = expandedImage.div(255);

    const predictions = model.predict(normalizedImage);

    const genderProb = predictions.dataSync()[0];

    const gender = genderProb >= 0.5 ? "Female" : "Male";

    if (gender == "Female") {
      res.json({ gender });
    } else {
      const err = new Error("Gender not verified");
      err.status = 401;
      return next(err);
    }
  } catch (err) {
    next(err);
  }
};
