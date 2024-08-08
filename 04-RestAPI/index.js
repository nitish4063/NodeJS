const express = require("express");
const app = express();

const users = require("./MOCK_DATA.json");

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
    const id = req.params.id;
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    const id = req.params.id;
    return res.json({ status: "pending" });
  });

app.post("api/users", (req, res) => {
  return res.json({ status: "pending" });
});

app.listen(8080, () => console.log("server started on port 8080"));
