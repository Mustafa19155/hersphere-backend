const User = require("../models/user");
const axios = require("axios");
const { google } = require("googleapis");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const tf = require("@tensorflow/tfjs-node");
const sharp = require("sharp");
const fs = require("fs").promises;
const Job = require("../models/job");
const mongoose = require("mongoose");
const Promotion = require("../models/promotion");
const Review = require("../models/review");
const Wallet = require("../models/wallet");

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
        // const found = await User.findOne({ "facebookPage.id": page.id });
        // if (!found) {
        finalPages.push(page);
        // }
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
        // const found = await User.findOne({ "instagramPage.id": page.id });
        // if (!found) {
        finalPages.push(page);
        // }
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
        if (!response.data.items) {
          return next({ message: "No channel found", status: 400 });
        }
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

    const user = new User({ ...req.body, porfileCompleted: false });

    await user.save();

    const wallet = new Wallet({ userID: user._id });

    await wallet.save();

    let token;
    token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    user.password = undefined;
    // user["token"] = token;

    return res.send({ ...user._doc, token });
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
      if (foundUser.youtubeChannel) {
        await User.findByIdAndUpdate(foundUser._id, {
          $set: {
            youtubeChannel: {
              ...foundUser.youtubeChannel,
              token: data.youtubeToken,
            },
          },
        });

        // foundUser.youtubeChannel.token = data.youtubeToken;
        // await foundUser.save();
        user.youtubeChannel.token = data.youtubeToken;
      }
      user["token"] = token;
      return res.send(user);
    } else {
      const user = new User(data);

      await user.save();

      const wallet = new Wallet({ userID: user._id });

      await wallet.save();

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

exports.recommendedInfluencers = async (req, res, next) => {
  try {
    const category = req.query.category;

    const highestRating = await Review.aggregate([
      {
        $match: {
          requestID: { $exists: true }, // Filter documents with requestID field
          "requestID.category": { $regex: /Category 1/i }, // Match documents with requestID containing the specified category
        },
      },
      {
        $group: {
          _id: "$givenTo", // Group by the givenTo field
          averageRating: { $avg: "$rating" }, // Calculate the average rating for each user
        },
      },
      {
        $sort: { averageRating: -1 }, // Sort by average rating in descending order
      },
      {
        $limit: 3, // Limit the results to the top 5 users
      },
    ]);

    const users = await User.find({ userType: "influencer" }).limit(3);
    res.json(
      users.map((user) => {
        const platforms = [];
        if (user._doc.facebookPage) {
          platforms.push("facebook");
        }
        if (user._doc.instagramPage) {
          platforms.push("instagram");
        }
        if (user._doc.youtubeChannel) {
          platforms.push("youtube");
        }

        return { ...user._doc, rating: 5, platforms };
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.getInfluencerProfileForRequest = async (req, res, next) => {
  try {
    const { id } = req.params;

    const influencer = await User.findById(id);
    const platforms = [];

    if (influencer._doc.facebookPage) {
      platforms.push("facebook");
    }
    if (influencer._doc.instagramPage) {
      platforms.push("instagram");
    }
    if (influencer._doc.youtubeChannel) {
      platforms.push("youtube");
    }

    const reviews = await Review.find({
      givenTo: id,
      requestID: { $exists: true },
    }).populate("givenBy");
    const totalPromotions = await Promotion.find({
      influencerID: id,
    }).countDocuments();

    res.json({
      ...influencer._doc,
      rating:
        reviews.length > 0
          ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
          : 0,
      reviews,
      totalPromotions,
      platforms,
    });
  } catch (err) {
    next(err);
  }
};

exports.searchInfluencers = async (req, res, next) => {
  try {
    const { name, platforms, categories } = req.query;

    const query = {
      userType: "influencer",
    };
    if (name) {
      query["username"] = { $regex: name, $options: "i" };
    }

    if (platforms) {
      // check if all platforms are included in user's profile

      query["$and"] = platforms.map((platform) => {
        return platform == "facebook"
          ? { facebookPage: { $exists: true } }
          : platform == "instagram"
          ? { instagramPage: { $exists: true } }
          : { youtubeChannel: { $exists: true } };
      });
    }
    if (categories) {
      query["businessDetails.targetAudience"] = { $in: categories };
    }
    const users = await User.aggregate([
      {
        $match: query,
      },
      {
        $lookup: {
          from: "reviews",
          localField: "_id",
          foreignField: "givenTo",
          as: "reviews",
        },
      },
      {
        $addFields: {
          averageRating: {
            $cond: [
              { $gt: [{ $size: "$reviews" }, 0] }, // Check if the user has reviews
              { $avg: "$reviews.rating" }, // Calculate average rating
              0, // If no reviews, set average rating to 0
            ],
          },
        },
      },
    ]);

    res.json(
      users.map((user) => {
        const platforms = [];
        if (user.facebookPage) {
          platforms.push("facebook");
        }
        if (user.instagramPage) {
          platforms.push("instagram");
        }
        if (user.youtubeChannel) {
          platforms.push("youtube");
        }

        return { ...user, rating: Math.ceil(user.averageRating), platforms };
      })
    );
  } catch (err) {
    next(err);
  }
};

exports.checkLogin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (user) {
      res.send(user);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    next(err);
  }
};

exports.influencerDashboard = async (req, res, next) => {
  try {
    const highestSuccess = await Promotion.aggregate([
      {
        $match: {
          status: {
            $nin: ["not-started", "started", "pending", "rejected"], // Exclude promotions with these statuses
          },
        },
      },
      {
        $group: {
          _id: "$influencerID", // Group by influencerID
          all: { $sum: 1 }, // Count all promotions for each influencer
          completed: {
            // Count completed promotions for each influencer
            $sum: {
              $cond: [{ $eq: ["$status", "completed"] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users", // Name of the collection to perform the lookup
          localField: "_id", // Field from the current collection (promotions) to match with foreignField
          foreignField: "_id", // Field from the foreign collection (influencers) to match with localField
          as: "influencer", // Name of the field to store the result of the lookup
        },
      },
      {
        $unwind: { path: "$influencer" },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          influencerID: "$_id", // Rename _id as influencerID
          all: 1, // Include all promotions count in the output
          completed: 1, // Include completed promotions count in the output
          influencer: 1, // Include influencer details in the output
          successScore: {
            $divide: ["$completed", "$all"], // Calculate success score by dividing completed promotions by all promotions
          },
        },
      },
      {
        $sort: { successScore: -1 }, // Sort by successScore in descending order
      },
      {
        $limit: 5, // Limit the results to 5 users
      },
    ]);

    const highestRating = await Review.aggregate([
      {
        $match: {
          requestID: { $exists: true }, // Filter documents with requestID field
        },
      },
      {
        $group: {
          _id: "$givenTo", // Group by the givenTo field
          averageRating: { $avg: "$rating" }, // Calculate the average rating for each user
        },
      },
      // populate user details
      {
        $lookup: {
          from: "users", // Name of the collection to perform the lookup
          localField: "_id", // Field from the current collection (reviews) to match with foreignField
          foreignField: "_id", // Field from the foreign collection (users) to match with localField
          as: "user", // Name of the field to store the result of the lookup
        },
      },
      {
        $unwind: { path: "$user" },
      },
      {
        $project: {
          _id: 0, // Exclude _id field from the output
          averageRating: 1, // Include average rating in the output
          user: 1, // Include user details in the output
        },
      },

      {
        $sort: { averageRating: -1 }, // Sort by average rating in descending order
      },

      {
        $limit: 5, // Limit the results to the top 5 users
      },
    ]);

    res.send({
      highestSuccess: highestSuccess.map((suc) => {
        return { ...suc, badge: suc.successScore > 0.5 ? "gold" : "silver" };
      }),
      highestRating,
    });
  } catch (err) {
    next(err);
  }
};
