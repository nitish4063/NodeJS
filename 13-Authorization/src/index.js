const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectMongoDb = require("./connection");

const UrlModel = require("./models/url");

const urlRouter = require("./routes/url");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");

const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected")
);

// FOR SERVER SIDE RENDERING, WE USE EJS ENGINE
app.set("view engine", "ejs");
app.set("views", path.resolve("src/views"));

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);

// ROUTES
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), urlRouter); // this route is restricted to normal user
app.use("/", staticRouter);
app.use("/user", userRouter);

app.get("/test", async (req, res) => {
  const allUrls = await UrlModel.find({});
  // HOME PAGE IS RENDERED BY EJS
  return res.render("home", { urls: allUrls, name: "jon" });
});

app.listen(8080, () => console.log("Server runnning at PORT 8080"));
