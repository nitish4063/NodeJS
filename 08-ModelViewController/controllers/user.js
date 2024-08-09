const User = require("../models/user");

const handleGetAllUsers = async (req, res) => {
  const dbUsers = await User.find({});
  return res.json(dbUsers);
};

const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  // WHEN USER DOES NOT EXISTS
  if (!user) return res.status(404).json({ msg: "USER NOT FOUND" });
  return res.json(user);
};

const handleUpdateUserById = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const updated = await User.findByIdAndUpdate(id, body, { new: true });

  return res.json({ status: "SUCCESSFULLY UPDATED", updated });
};

const handleDeleteUserById = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete(id);

  return res.json({ status: "SUCCESSFULLY DELETED", deletedUser });
};

const handleCreateNewUser = async (req, res) => {
  const body = req.body;
  // IMPLEMENTING BAD REQUEST
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.gender ||
    !body.email ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "ALL FIELDS ARE REQUIRED" });
  }

  const newObj = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res
    .status(201)
    .json({ status: "SUCCESSFULLY CREATED NEW USER", newObj });
};

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
