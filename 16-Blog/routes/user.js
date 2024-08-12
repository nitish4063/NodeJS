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
  try {
    const token = await userModel.matchPasswordAndGenerateToken(
      email,
      password
    );

    console.log("USER IS LOGGED IN");
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect email or password" });
  }
});

router.get("/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
