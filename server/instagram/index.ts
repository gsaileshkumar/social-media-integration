import express from "express";
import axios from "../network";
import qs from "qs";
import InstagramToken from "./store";
import { Method } from "axios";
import dotenv from "dotenv";

const router = express.Router();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

router.get("/auth", function(req, res) {
  return res.redirect(
    `${process.env.INSTAGRAM_OAUTH_URI}/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`
  );
});

router.get("/callback", async function(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.send("error");
  }
  const sl_options = {
    client_id: process.env.INSTAGRAM_CLIENT_ID,
    client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
    code
  };
  const sl_reqOptions = {
    url: `${process.env.INSTAGRAM_OAUTH_URI}/access_token`,
    method: "post" as Method,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: qs.stringify(sl_options)
  };
  try {
    const sl_response = await axios.request(sl_reqOptions);
    const ll_options = {
      client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
      grant_type: "ig_exchange_token",
      access_token: sl_response.data.access_token
    };
    const ll_reqOptions = {
      url: `${process.env.INSTAGRAM_GRAPH_URI}/access_token`,
      method: "get" as Method,
      params: ll_options
    };
    const ll_response = await axios.request(ll_reqOptions);
    InstagramToken.set(ll_response.data.access_token);
    return res.status(200).send("Instagram authorization SUCCESS!!!");
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
});

export default router;
