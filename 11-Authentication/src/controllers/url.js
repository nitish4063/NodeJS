const ShortUniqueId = require("short-unique-id");
const UrlModel = require("../models/url");

const handleGenerateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL IS REQUIRED" });

  const { randomUUID } = new ShortUniqueId({ length: 8 });
  const shortID = randomUUID();

  const result = await UrlModel.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  console.log(result);

  // return res.json({ msg: "SUCCESS", id: shortID });
  return res.render("home", { id: shortID });
};

const handleGetAnalytics = async (req, res) => {
  const id = req.params.id;
  const result = await UrlModel.findOne({ shortId: id });
  console.log(result);

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

const handleRedirect = async (req, res) => {
  const shortID = req.params.id;
  const entry = await UrlModel.findOneAndUpdate(
    { shortId: shortID },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    { returnNewDocument: true }
  );
  console.log(entry);

  res.redirect(entry.redirectURL);
};

module.exports = {
  handleGenerateNewShortUrl,
  handleGetAnalytics,
  handleRedirect,
};
