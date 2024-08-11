const path = require("path");
const express = require("express");
const PORT = 8080;
const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", (req, res) => {
  return res.render("home");
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
