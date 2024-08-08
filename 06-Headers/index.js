const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

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

app.get("/users", (req, res) => {
  const html = `
          <ul>
              ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>
      `;
  return res.send(html);
});

// HEADERS: metadata about requests and responses (data about data)

app.get("/api/users", (req, res) => {
  // always add X to custom header
  res.setHeader("X-single", "yes"); // custom header

  console.log(req.headers);

  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    // WHEN USER DOES NOT EXISTS
    if (!user) return res.status(404).json({ msg: "USER NOT FOUND" });

    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const user = users.find((user) => user.id === id);
    const updatedUser = { ...user, ...body };

    const ind = users.findIndex((user) => user.id === id);
    users[ind] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", updatedUser });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);

    const ind = users.findIndex((user) => user.id === id);
    const deleted = users.splice(ind, 1)[0];

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "success", deleted });
    });
  });

app.post("/api/users", (req, res) => {
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

  const newObj = { id: Date.now(), ...body };
  users.push(newObj);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    // WHENEVER WE CREATE A NEW USER, WE SEND 201 STATUS CODE
    // INDICATING NEW USER OR RESOURCE IS CREATED SUCCESSFULLY
    return res
      .status(201)
      .json({ status: "success, new user created", newObj });
  });
});

app.listen(8080, () => console.log("server started on port 8080"));
