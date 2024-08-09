const express = require("express");
const fs = require("fs");
const userRouter = require("./routes/user");
const { connectMongoDb } = require("./connection");
const { logReqRes } = require("./middlewares/index");

const app = express();

connectMongoDb("mongodb://127.0.0.1:27017/database_name")
.then(() => console.log('MongoDb connected'))

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// CREATED A ROUTER
app.use("/api/users", userRouter);

app.listen(8080, () => console.log("server started on port 8080"));
