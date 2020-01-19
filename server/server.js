const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const instagram = require("./instagram");
// const twitter = require("./twitter");

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors());

app.use("/instagram", instagram);

app.get("/callback", async (req, res) => {
  console.log("/callback endpoint hit");
  res.send("/callback endpoint hit");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "../index.html"));
});
