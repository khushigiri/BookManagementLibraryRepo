const express = require("express");

const { users } = require("./Data/Users.json");

const app = express();

const port = 8081;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

/**
 * Route: /users
 * Method: GET
 * Description: Get All Users
 * Access: Public
 * Parameters: None
 */

app.get("/users", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * Route: /users/:id
 * Method: GET
 * Description: Getting user by id
 * Access: Public
 * Parameters: id
 */

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosen't exist!!",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User Found",
    data: user,
  });
});

/**
 * Route: /users
 * Method: POST
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */

app.post("/users", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;

  const user = users.find((each) => each.id == id);

  if (user) {
    return res.status(404).json({
      success: false,
      message: "User with this ID already exits",
    });
  }

  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });

  return res.status(200).json({
    success: true,
    message: "User Added Successfully :-)",
    data: users,
  });
});

app.get("*", (req, res) => {
  res.status(404).json({
    message: "This root doesn't exist !!",
  });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

//http://localhost:8081
