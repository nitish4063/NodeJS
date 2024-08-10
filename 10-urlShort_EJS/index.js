const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const connectMongoDb = require("./connection");
const UrlModel = require("./models/url");

const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected")
);

// FOR SERVER SIDE RENDERING, WE USE EJS ENGINE
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", async (req, res) => {
  const allUrls = await UrlModel.find({});
  // HOME PAGE IS RENDERED BY EJS
  return res.render("home", { urls: allUrls, name: "jon" });
});

// ROUTES
app.use("/url", urlRouter);
app.use("/", staticRouter);

app.listen(8080, () => console.log("Server runnning at PORT 8080"));
