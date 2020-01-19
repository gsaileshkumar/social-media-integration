const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.use(cors());

app.get("/auth", (req, res) => {
  console.log("/auth endpoint hit");
  res.send("/auth endpoint hit");
});

app.get("/callback", async (req, res) => {
  console.log("/callback endpoint hit");
  res.send("/callback endpoint hit");
});

app.get("/", (req, res) => {
  res.send('Hello<br><a href="/auth">Log in with Instagram</a>');
});
