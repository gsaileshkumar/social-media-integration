const express = require("express");
const router = express.Router();
const axios = require("../network");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

router.get("/auth", function(req, res) {
  return res.redirect(
    `${process.env.INSTAGRAM_OAUTH_URI}/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
  );
});
router.get("/callback", function(req, res) {
  console.log("/callback hit");
});

module.exports = router;
