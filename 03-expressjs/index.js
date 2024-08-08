const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.end("Hello from HOME PAGE");
});
app.get("/about", (req, res) => {
  return res.end("Hello from ABOUT PAGE" + " Hey " + req.query.name);
});

app.listen(8080, () => console.log("server started!"));
