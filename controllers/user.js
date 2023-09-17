const express = require("express");
const User = require("../models/user");
const axios = require("axios");
const { google } = require("googleapis");

exports.getFacebookPages = async (req, res, next) => {
  try {
    const { token, userType } = req.query;

    const response = await axios.get(
      "https://graph.facebook.com/v12.0/me/accounts?fields=name,access_token,media_count,followers_count,tasks,id&access_token={access_token}",
      {
        params: {
          access_token: token,
        },
      }
    );

    let pages = response.data.data;

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
    res.send(pages);
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

    for (const page of pages) {
      const res = await axios.get(
        `https://graph.facebook.com/v12.0/${page.instagram_business_account.id}?fields=media_count,followers_count&access_token=${token}`
      );
      page["id"] = page.instagram_business_account.id;
      page["name"] = page.instagram_business_account.username;
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
    res.send(pages);
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

  const people = google.people({
    version: "v1",
    auth: oauth2Client,
  });

  people.people.get(
    {
      resourceName: "people/me",
      personFields: "genders",
    },
    (err, res) => {
      const gender = res.data;
    }
  );

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
    (err, response) => {
      if (err) {
        console.error(err);
      } else {
        const stats = response.data.items[0].statistics;

        const channelId = response.data.items[0].id;

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

                  // Get the video details and statistics
                  const videoDetails = videoResponse.data.items[0].snippet;
                  const videoStats = videoResponse.data.items[0].statistics;
                }
              );
            });
            const data = response.data.items[0];
            res.json({ id: data.id, stats: data.statistics });
          })
          .catch((err) => {
            console.log(err);
          });

        // res.send(response.data.items[0]);
      }
    }
  );
};
