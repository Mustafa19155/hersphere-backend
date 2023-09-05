const express = require("express");
const User = require("../models/user");
const axios = require("axios");
const { google } = require("googleapis");

exports.getFacebookPages = (req, res) => {
  const { access_token } = req.query;

  axios
    .get(
      "https://graph.facebook.com/v12.0/me/accounts?fields=name,access_token,tasks,id,instagram_business_account{id,username}&access_token={access_token}",
      {
        params: {
          access_token,
        },
      }
    )
    .then((response) => {
      console.log(response.data);
      // Handle the API response
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      // Handle any errors
      return res.status(400).send("Something went wrong");
    });
};

exports.getYoutubeDetails = (req, res) => {
  const { access_token } = req.query;
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
      console.log(gender);
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
    (err, res) => {
      if (err) {
        console.error(err);
      } else {
        console.log("User has a YouTube account");
      }
    }
  );
};
