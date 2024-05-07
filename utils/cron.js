const Promotion = require("../models/promotion");
const Post = require("../models/post");
const Workplace = require("../models/workplace");
const Transaction = require("../models/transaction");
const User = require("../models/user");
const Job = require("../models/job");
const cron = require("node-cron");
const axios = require("axios");

exports.checkExpiredPromotions = async () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        // check for pending promotions and set them to expired
        const promotions = await Promotion.find({
          status: "pending",
          deadline: { $lt: new Date() },
        });
        promotions.forEach(async (promotion) => {
          const transaction = new Transaction({
            userID: promotion.userID,
            amount: promotion.transactionID.amount,
            type: "wallet",
            direction: "out",
            reason: "Promotion Expired",
          });

          await transaction.save();

          const user = await User.findById(promotion.userID);
          if (user) {
            user.balance += promotion.transactionID.amount;
            await user.save();
          }

          promotion.status = "rejected";
          await promotion.save();
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
    {
      timezone: "Asia/Singapore",
    }
  );
};

exports.checkActivePromotions = async () => {
  cron.schedule(
    "*/5 * * * *",
    async () => {
      try {
        const promotions = await Promotion.find({
          status: "started",
          deadline: { $lt: new Date() },
        }).populate("userID influencerID transactionID");

        promotions.forEach(async (promotion) => {
          const posts = await Post.find({ promotionID: promotion._id });
          let isCompleted = false;

          for (let post of posts) {
            if (post.platform === "facebook") {
              const facebookPost = await axios.get(
                `https://graph.facebook.com/v12.0/${post.postID}?fields=likes.limit(10).summary(true),comments.limit(10).summary(true)&access_token=${promotion.influencerID.facebookPage.access_token}`
              );
              facebookPost.data.likes.summary.total_count >=
                promotion.requirements.likes &&
              facebookPost.data.comments.summary.total_count >=
                promotion.requirements.comments
                ? (isCompleted = true)
                : (isCompleted = false);
            } else if (post.platform === "instagram") {
              const instagramPost = await axios.get(
                `https://graph.facebook.com/v12.0/${post.postID}?fields=like_count,comments_count&access_token=${promotion.influencerID.instagramPage.token}`
              );

              instagramPost.data.like_count >= promotion.requirements.likes &&
              instagramPost.data.comments_count >=
                promotion.requirements.comments
                ? (isCompleted = true)
                : (isCompleted = false);
            } else if (post.platform === "youtube") {
              const youtubePost = await axios.get(
                `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${post.postID}&key=${process.env.YOUTUBE_API_KEY}`
              );

              youtubePost.data.items[0].statistics.likeCount >=
                promotion.requirements.likes &&
              youtubePost.data.items[0].statistics.commentCount >=
                promotion.requirements.comments
                ? (isCompleted = true)
                : (isCompleted = false);
            }
          }
          if (isCompleted) {
            promotion.completedOn = Date.now();
            promotion.status = "completed";

            const transaction = new Transaction({
              userID: promotion.influencerID._id,
              amount: promotion.transactionID.amount,
              type: "wallet",
              direction: "out",
              reason: "Promotion Completed",
            });
            await transaction.save();

            // update user balance
            const user = await User.findById(promotion.influencerID._id);
            if (user) {
              user.balance += promotion.transactionID.amount;
              await user.save();
            }

            await promotion.save();
          } else {
            const transaction = new Transaction({
              userID: promotion.userID._id,
              amount: promotion.transactionID.amount,
              type: "wallet",
              direction: "out",
              reason: "Promotion Failed",
            });
            await transaction.save();

            // update user balance
            const user = await User.findById(promotion.userID._id);
            if (user) {
              user.balance += promotion.transactionID.amount;
              await user.save();
            }

            promotion.status = "failed";
            await promotion.save();
          }
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
    {
      timezone: "Asia/Singapore",
    }
  );
};

exports.updateWorkplaceStatus = async () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const workplaces = await Workplace.find({
          endDate: { $lt: new Date() },
        });

        workplaces.forEach(async (workplace) => {
          const jobs = await Job.find({
            workplaceID: workplace._id,
            employee: { $ne: null },
          });

          jobs.forEach(async (job) => {
            const transaction = new Transaction({
              userID: job.employee.userID,
              amount: job.price / 2,
              type: "wallet",
              direction: "out",
              reason: `${job.title} Job Payment (Full)`,
            });

            await transaction.save();

            const user = await User.findById(job.employee.userID);
            if (user) {
              user.balance += job.price / 2;
              await user.save();
            }
            job.paymentStatus = "full";
            await job.save();
          });

          workplace.status = "inactive";
          await workplace.save();
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
    {
      timezone: "Asia/Singapore",
    }
  );
};

exports.jobPayment = async () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      try {
        const jobs = await Job.find({
          paymentStatus: "pending",
        }).populate("workplaceID");

        jobs.forEach(async (job) => {
          const startDate = new Date(job.workplaceID.createdAt);
          const endDate = new Date(job.workplaceID.endDate);

          // calculate total days
          const totalDays = Math.ceil(
            (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          );
          // calculate days between start date and current date
          const daysPassed = Math.ceil(
            (new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24)
          );

          if (daysPassed >= totalDays / 2) {
            const transaction = new Transaction({
              userID: job.employee.userID,
              amount: job.price / 2,
              type: "wallet",
              direction: "out",
              reason: `${job.title} Job Payment (Half)`,
            });

            await transaction.save();

            const user = await User.findById(job.employee?.userID);
            if (user) {
              user.balance += job.price / 2;
              await user.save();
            }

            job.paymentStatus = "half";
            await job.save();
          }
        });
      } catch (error) {
        console.error("Error occurred:", error);
      }
    },
    {
      timezone: "Asia/Singapore",
    }
  );
};
