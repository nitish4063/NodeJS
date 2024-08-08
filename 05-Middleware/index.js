const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();

// First middleware
app.use(express.urlencoded({ extended: false }));

// second middleware
app.use((req, res, next) => {
  req.newName = "superman";
  console.log("Inside middleware 1");
  next();
});

/* app.get("/api/users", (req, res) => {
  return res.json(users);
}); */

// third middleware
app.use((req, res, next) => {
  console.log("Inside middleware 2", req.newName);
  fs.appendFile(
    "log.txt",
    `${Date.now()} ${req.method} ${req.path} ${req.ip}\n`,
    (err, data) => {
      next();
    }
  );
});

// ALL MIDDLEWARES MUST BE WRITTEN BEFORE ROUTES ELSE THEY WILL NOT BE EXECUTED

// ROUTES

// client will get the html document which we created at the server side
app.get("/users", (req, res) => {
  const html = `
          <ul>
              ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
          </ul>
      `;
  // server side rendering  (we send html data to the client)
  return res.send(html);
});

// request to server to list all the users in JSON
app.get("/api/users", (req, res) => {
  console.log("Inside GET method", req.newName);
  return res.json(users);
});

// DYNAMIC PATH PARAMETERS .. get a user with a specific id
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;

    const user = users.find((user) => user.id === id);
    const updatedUser = { ...user, ...body }; // overwriting existing key value pairs

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

  const newObj = { id: Date.now(), ...body };
  users.push(newObj);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success, new user created", newObj });
  });
});

app.listen(8080, () => console.log("server started on port 8080"));
