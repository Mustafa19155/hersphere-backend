const axios = require("axios");
const Post = require("../models/Post");

exports.uploadToFacebook = async (req, res, next) => {
  try {
    const { accessToken, pageId, url, message } = req.body;

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
        });

        await post.save();

        res.send(response.data);
      })
      .catch((error) => {
        next(error.response.data);
      });
  } catch (err) {
    next(err);
  }
};

exports.uploadToInsta = async (req, res, next) => {
  try {
    const { facebookAccessToken, instagramAccountId, imageUrl, caption } =
      req.body;
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
            });

            await post.save();
            res.send(response.data);
          })
          .catch((err) => {
            next(err);
          });
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
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

exports.uploadToYoutube = (req, res, next) => {};
