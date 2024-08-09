const express = require("express");
const urlRouter = require("./routes/url");
const connectMongoDb = require("./connection");
const UrlModel = require("./models/url");

const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/short-url").then(() =>
  console.log("MongoDb connected")
);

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/url", urlRouter);


app.listen(8080, () => console.log("Server runnning at PORT 8080"));
