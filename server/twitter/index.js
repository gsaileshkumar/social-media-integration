const express = require("express");
const router = express.Router();
const axios = require("../network");
const qs = require("qs");
const TwitterToken = require("./store");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

router.get("/auth", async function(req, res) {
  const options = {
    grant_type: "client_credentials"
  };
  const reqOptions = {
    url: `${process.env.TWITTER_OAUTH_URI}/token`,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    auth: {
      username: process.env.TWITTER_API_KEY,
      password: process.env.TWITTER_API_SECRET_KEY
    },
    data: qs.stringify(options)
  };
  try {
    const response = await axios.request(reqOptions);
    console.log(response);
    TwitterToken.set(response.data.access_token);
    return res.status(200).send("Twitter authorization SUCCESS!!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
});

module.exports = router;
