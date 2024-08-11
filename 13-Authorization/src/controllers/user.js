const userModel = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

const handleUserSignup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
  });
  console.log("NEW USER CREATED ON SIGNUP", user);
  return res.redirect("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password });
  if (!user)
    return res.render("login", {
      error: "INVALID USERNAME OR PASSWORD",
    });

  console.log("LOGGED IN USER", user);

  const token = setUser(user);
  res.cookie("token", token);

  return res.redirect("/");
};

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
