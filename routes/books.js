const express = require("express");

const { books } = require("../Data/Books.json");

const { users } = require("../Data/Users.json");

const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Getting all books
 * Access: Public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Got all the books",
    data: books,
  });
});

/**
 * Route: /:id
 * Method: GET
 * Description: Getting user by id
 * Access: Public
 * Parameters: id
 */

/**
 * Route: /issued
 * Method: GET
 * Description: Getting all issued books
 * Access: Public
 * Parameters: none
 */

router.get("/issued", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];
  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id == each.issuedBook);
    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length == 0) {
    return res.status(404).json({
      success: false,
      message: "No books has been issued yet!",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Users with issued books..",
    data: issuedBooks,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id == id);
  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Book Found !!",
    data: books,
  });
});

module.exports = router;
