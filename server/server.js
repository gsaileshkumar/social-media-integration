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

app.use(cors());

app.use("/instagram", instagram);

app.get(
  "/content",
  cors({ origin: "sailesh.netlify.com" }),
  async (req, res) => {
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
      console.log("instagram resp", instagramResponse.data);
      res.status(200).send(instagramResponse.data);
    } catch (error) {
      console.log(error);
      res.status(500).send("SERVER ERROR");
    }
  }
);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../index.html"));
});
