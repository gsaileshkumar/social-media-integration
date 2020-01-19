const express = require("express");
const router = express.Router();
const axios = require("../network");
const qs = require("qs");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

router.get("/auth", function(req, res) {
  return res.redirect(
    `${process.env.INSTAGRAM_OAUTH_URI}/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
  );
});
router.get("/callback", async function(req, res) {
  const { code } = req.query;
  console.log("code", code);
  if (!code) {
    return res.send("error");
  }
  const options = {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code
  };
  const reqOptions = {
    url: `${process.env.INSTAGRAM_OAUTH_URI}/access_token`,
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(options)
  };
  try {
    const response = await axios.request(reqOptions);
    console.log("data", response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
