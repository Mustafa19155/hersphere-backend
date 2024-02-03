const axios = require("axios");

exports.uploadToFacebook = (req, res, next) => {
  const { accessToken, pageId, url, message } = req.body;

  axios
    .post(`https://graph.facebook.com/v18.0/${pageId}/photos`, {
      url,
      message,
      access_token: accessToken,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      next(error.response.data);
    });
};

exports.uploadToInsta = (req, res, next) => {
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
        .then((response) => {
          res.send(response.data);
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};
