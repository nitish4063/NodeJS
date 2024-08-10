const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      // shortened url
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      // actual url
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: {
          type: Number,
        },
      },
    ],
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url", urlSchema);

module.exports = UrlModel;
