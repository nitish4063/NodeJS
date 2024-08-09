const express = require("express");
const app = express();

const fs = require("fs");

const mongoose = require("mongoose");

// CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/database_name")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb Error", err));

// SCHEMA
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    jobTitle: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

// MODEL
const User = mongoose.model("user", userSchema);

// MIDDLEWARES
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()} ${req.method} ${req.path} ${req.ip}\n`,
    (err, data) => {
      next();
    }
  );
});

// ROUTES
app.get("/users", async (req, res) => {
  const dbUsers = await User.find({});
  const html = `
          <ul>
              ${dbUsers
                .map((user) => `<li>${user.firstName} ${user.email}</li>`)
                .join("")}
          </ul>
      `;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const dbUsers = await User.find({});
  return res.json(dbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const id = req.params.id;

    const user = await User.findById(id);

    // WHEN USER DOES NOT EXISTS
    if (!user) return res.status(404).json({ msg: "USER NOT FOUND" });

    return res.json(user);
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const body = req.body;

    await User.findByIdAndUpdate(id, body);

    return res.json({ status: "SUCCESSFULLY UPDATED" });
  })
  .delete(async (req, res) => {
    const id = req.params.id;

    const deletedUser = await User.findByIdAndDelete(id);

    return res.json({ status: "SUCCESSFULLY DELETED", deletedUser });
  });

app.post("/api/users", async (req, res) => {
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
});

app.listen(8080, () => console.log("server started on port 8080"));
