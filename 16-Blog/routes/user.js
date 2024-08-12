const { Router } = require("express");
const userModel = require("../models/user");

const router = Router();

router.get("/signup", (req, res) => {
  return res.render("signup");
});

router.get("/signin", (req, res) => {
  return res.render("signin");
});

router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;
  const newUser = await userModel.create({
    fullName,
    email,
    password,
  });

  console.log("NEW USER CREATED", newUser);
  return res.redirect("/");
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.matchPassword(email, password);

  console.log("USER IS LOGGED IN", user);
  return res.redirect("/");
});

module.exports = router;
