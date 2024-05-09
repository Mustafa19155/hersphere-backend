const axios = require("axios");
const Post = require("../models/post");
const Promotion = require("../models/promotion");
const User = require("../models/user");
const { google } = require("googleapis");
const { Readable } = require("stream");
const fs = require("fs");
const https = require("https");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

exports.uploadToFacebook = async (req, res, next) => {
  try {
    const { accessToken, pageId, url, message, promotionId } = req.body;

    axios
      .post(`https://graph.facebook.com/v18.0/${pageId}/photos`, {
        url,
        message,
        access_token: accessToken,
      })
      .then(async (response) => {
        const post = new Post({
          platform: "facebook",
          postID: response.data.post_id,
          userID: req.userId,
          promotionID: promotionId,
        });

        await post.save();

        res.send(response.data);
      })
      .catch((error) => {
        next(error?.response?.data);
      });
  } catch (err) {
    next(err);
  }
};

exports.uploadToInsta = async (req, res, next) => {
  try {
    const {
      facebookAccessToken,
      instagramAccountId,
      imageUrl,
      caption,
      promotionId,
    } = req.body;
    axios
      .post(
        `https://graph.facebook.com/v18.0/${instagramAccountId}/media?&caption=${caption}&access_token=${facebookAccessToken}&is_carousel_item=${false}`,
        { image_url: imageUrl }
      )
      .then((respp) => {
        const creationId = respp.data.id;
        axios
          .post(
            `https://graph.facebook.com/v18.0/${instagramAccountId}/media_publish?creation_id=${creationId}&access_token=${facebookAccessToken}`
          )
          .then(async (response) => {
            const post = new Post({
              platform: "instagram",
              postID: response.data.id,
              userID: req.userId,
              promotionID: promotionId,
            });

            await post.save();
            res.send(response.data);
          })
          .catch((err) => {
            console.log(err.response.data);
            next(err);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
        next(err);
      });
  } catch (err) {
    console.log(err.response.data);
    next(err);
  }
};

exports.getPostDetails = async (req, res, next) => {
  try {
    const { postID } = req.params;

    const { accessToken } = req.body;

    const post = await Post.findOne({ postID }).select("platform");

    if (!post) {
      return res.status(404).send("Post not found");
    }

    const { platform } = post;

    if (platform === "facebook") {
      // get facebook post details using graph api
      const facebookPost = await axios.get(
        `https://graph.facebook.com/v12.0/${postID}?fields=likes.limit(10).summary(true),comments.limit(10).summary(true)&access_token=${accessToken}`
      );

      return res.send(facebookPost.data);
    } else {
      // get instagram post details using graph api
      const instagramPost = await axios.get(
        `https://graph.facebook.com/v12.0/${postID}?fields=like_count,comments_count&access_token=${accessToken}`
      );

      return res.send(instagramPost.data);
    }
  } catch (err) {
    next(err.response);
  }
};

const createDirectoryIfNotExists = (directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true }); // recursive: true ensures creation of nested directories
  }
};

// Function to download file from URL
const downloadFile = (url, destinationDirectory) => {
  return new Promise((resolve, reject) => {
    createDirectoryIfNotExists(destinationDirectory); // Create destination directory if it doesn't exist

    const randomFileName = uuidv4(); // Generate a random filename
    const destinationPath = path.join(destinationDirectory, randomFileName);

    const file = fs.createWriteStream(destinationPath);

    https
      .get(url, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(resolve(destinationPath));
        });
      })
      .on("error", (error) => {
        fs.unlink(destinationPath, () => {
          reject(error.message);
        });
      });
  });
};
exports.uploadToYoutube = async (req, res, next) => {
  // upload post to youtube
  try {
    const { accessToken, title, description, promotionId, url } = req.body;

    const destinationPath = "./tempfile"; // Choose a destination path for the downloaded file
    const filePath = await downloadFile(url, destinationPath);

    // return res.send("A");
    // const { originalname, buffer } = req.file;

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const youtube = google.youtube({
      version: "v3",
      auth: oauth2Client,
    });

    const metadata = {
      snippet: {
        title,
        description,
      },
      status: {
        privacyStatus: "public",
      },
    };

    const params = {
      part: "snippet,status",
      media: {
        mimeType: "video/*",
        // body: req.file ? Readable.from(req.file.buffer) : req.body.url,
        body: fs.createReadStream(filePath),
      },
      notifySubscribers: false,
      resource: metadata,
    };

    youtube.videos.insert(params, async (err, data) => {
      if (err) {
        console.error(`Error uploading video: ${err}`);
        return res.status(500).send(`Error uploading video: ${err}`);
      } else {
        const post = new Post({
          platform: "youtube",
          postID: data.data.id,
          userID: req.userId,
          promotionID: promotionId,
        });
        await post.save();
        return res.send("Video uploaded successfully!");
      }
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

exports.getPostsDetailsByRequest = async (req, res, next) => {
  try {
    const { promotionId } = req.params;
    const promotion = await Promotion.findById(promotionId).populate(
      "userID influencerID transactionID"
    );
    const posts = await Post.find({ promotionID: promotionId });
    const user = await User.findById(promotion.influencerID._id);

    if (!posts) {
      return res.status(404).send("Posts not found");
    }

    const postDetails = [];

    for (let post of posts) {
      if (post.platform === "facebook") {
        const facebookPost = await axios.get(
          `https://graph.facebook.com/v12.0/${post.postID}?fields=likes.limit(10).summary(true),comments.limit(10).summary(true)&access_token=${user.facebookPage.access_token}`
        );

        postDetails.push({
          facebook: {
            likes: facebookPost.data.likes.summary.total_count,
            comments: facebookPost.data.comments.summary.total_count,
          },
        });
      } else if (post.platform === "instagram") {
        const instagramPost = await axios.get(
          `https://graph.facebook.com/v12.0/${post.postID}?fields=like_count,comments_count&access_token=${user.instagramPage.token}`
        );

        postDetails.push({
          instagram: {
            likes: instagramPost.data.like_count,
            comments: instagramPost.data.comments_count,
          },
        });
      } else if (post.platform === "youtube") {
        console.log(post);
        const oauth2Client = new google.auth.OAuth2();
        oauth2Client.setCredentials({
          access_token: user.youtubeChannel.token,
        });

        const youtube = google.youtube({
          version: "v3",
          auth: oauth2Client,
        });

        // retrieve the user's channel ID
        const {
          data: { items: channels },
        } = await youtube.channels.list({
          part: "id",
          mine: true,
        });

        const channelId = channels[0].id;

        // retrieve a list of the user's uploaded videos
        const {
          data: { items: videos },
        } = await youtube.videos.list({
          part: "snippet,statistics",
          id: post.postID,
          channelId: channelId,
          maxResults: 50, // retrieve up to 50 videos
        });
        if (videos.length > 0) {
          postDetails.push({
            youtube: {
              likes: videos[0].statistics.likeCount,
              comments: videos[0].statistics.commentCount,
            },
          });
        }

        // const youtubePost = await axios.get(
        //   `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${post.postID}&key=${process.env.YOUTUBE_API_KEY}`
        // );

        // postDetails.push({ youtube: youtubePost.data });
      }
    }
    return res.send({ promotion, postDetails });
  } catch (err) {
    next(err);
  }
};
