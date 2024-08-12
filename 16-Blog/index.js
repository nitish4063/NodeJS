const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");

const PORT = 8080;
const app = express();

mongoose
  .connect("mongodb://localhost:27017/blogify")
  .then(() => console.log("MongoDb Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("home");
});

app.use("/user", userRouter);

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
