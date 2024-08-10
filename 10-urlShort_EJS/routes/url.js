const express = require("express");
const {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateNewShortUrl);

router.get("/analytics/:id", handleGetAnalytics);

router.get("/:id", handleRedirect);

module.exports = router;
