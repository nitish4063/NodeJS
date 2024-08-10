const express = require("express");
const UrlModel = require("../models/url");

const router = express.Router();

router.get("/", async (req, res) => {
  const allUrls = await UrlModel.find({});
  return res.render("home", { urls: allUrls });
});

module.exports = router;
