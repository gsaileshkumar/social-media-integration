import express from "express";
import path from "path";
import cors from "cors";
import axios from "./network";
import instagram from "./instagram";
import instagramToken from "./instagram/store";
import twitter from "./twitter";
import twitterToken from "./twitter/store";
import { Method } from "axios";

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors({ origin: "https://sailesh.netlify.com" }));

app.use("/instagram", instagram);
app.use("/twitter", twitter);

app.get("/content", async (req, res) => {
  const instagramMediaOptions = {
    url: `${process.env.INSTAGRAM_GRAPH_URI}/me/media`,
    method: "get" as Method,
    params: {
      fields:
        "id,caption,permalink,media_url,timestamp,username,thumbnail_url,media_type",
      access_token: instagramToken.get()
    }
  };
  const twitterOptions = {
    url: `${process.env.TWITTER_API_URI}/statuses/user_timeline.json`,
    method: "get" as Method,
    params: {
      screen_name: "gsaileshkumar"
    },
    headers: {
      Authorization: `Bearer ${twitterToken.get()}`
    }
  };
  try {
    const instagramResponse = await axios.request(instagramMediaOptions);
    const twitterResponse = await axios.request(twitterOptions);
    const data = {
      instagram: instagramResponse.data,
      twitter: twitterResponse.data
    };
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});
