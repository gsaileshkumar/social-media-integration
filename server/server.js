const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const axios = require("./network");
const path = require("path");
const instagram = require("./instagram");
const instagramToken = require("./instagram/store");
// const twitter = require("./twitter");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const whitelist = ["https://sailesh.netlify.com"];
var corsOptions = {
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  }
};
app.use(cors(corsOptions));

app.use("/instagram", instagram);

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
  try {
    const instagramResponse = await axios.request(instagramMediaOptions);
    res.status(200).send(instagramResponse.data);
  } catch (error) {
    console.log(error);
    res.status(500).send("SERVER ERROR");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./index.html"));
});
