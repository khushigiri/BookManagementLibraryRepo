const express = require("express");

const { users } = require("./Data/Users.json");

const usersRouter = require("./routes/users.js");
//http://localhost:8081/users

const booksRouter = require("./routes/books.js");
//http://localhost:8081/books

const router = express();

const port = 8081;

router.use(express.json());

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Server is up and running :-)",
  });
});

router.use("/users", usersRouter);
router.use("/books", booksRouter);

router.get("*", (req, res) => {
  res.status(404).json({
    message: "This route doesn't exist !!",
  });
});

router.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});

//http://localhost:8081/user
