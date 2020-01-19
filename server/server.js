const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const axios = require("./network");
const path = require("path");
const instagram = require("./instagram");
const instagramToken = require("./instagram/store");
const twitter = require("./twitter");
const twitterToken = require("./twitter/store");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors({ origin: "https://sailesh.netlify.com" }));

app.use("/instagram", instagram);
app.use("/twitter", twitter);

app.get("/content", async (req, res) => {
  const instagramMediaOptions = {
    url: `${process.env.INSTAGRAM_GRAPH_URI}/me/media`,
    method: "get",
    params: {
      fields:
        "id,caption,permalink,media_url,timestamp,username,thumbnail_url,media_type",
      access_token: instagramToken.get()
    }
  };
  const twitterOptions = {
    url: `${process.env.TWITTER_API_URI}/statuses/user_timeline.json`,
    method: "get",
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
