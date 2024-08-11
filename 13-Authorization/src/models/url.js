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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

const UrlModel = mongoose.model("url", urlSchema);

module.exports = UrlModel;
