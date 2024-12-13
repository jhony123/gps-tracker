const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const {
  _100per15minLimit,
  _20per15minLimit,
  _5per1minLimit,
} = require("./rate-limits");
const { loginUser, verifyUser } = require("./user");
const {
  addLocationFromBoard,
  getLocations,
  getLastKnownLocations,
} = require("./location");

app.use(cors({ origin: process.env.CLIENT_URL }));

app.post("/user/login", _20per15minLimit, bodyParser.json(), loginUser);

app.get(
  "/location/lastKnownLocations",
  _100per15minLimit,
  verifyUser,
  getLastKnownLocations
);

app.get("/location/locations", _100per15minLimit, verifyUser, getLocations);

app.post("/location", _5per1minLimit, bodyParser.text(), addLocationFromBoard);

app.get("/healthCheck", _20per15minLimit, (req, res) => {
  res.send("Health check ok!");
});

const port = process.env.PORT || 3001;
app.listen(port, "::", () => {});
