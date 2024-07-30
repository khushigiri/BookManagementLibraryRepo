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

/**
 * Route: /:id
 * Method: GET
 * Description: Getting user by id
 * Access: Public
 * Parameters: id
 */

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

/**
 * Route: /
 * Method: POST
 * Description: Add new book
 * Access: Public
 * Parameters: none
 */

router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No data to add book",
    });
  }

  const book = books.find((each) => each.id == data.id);
  if (book) {
    return res.status(404).json({
      success: false,
      message: "id already exists !!",
    });
  }
  const allBooks = { ...books, data };

  return res.status(200).json({
    success: true,
    message: "Book Added Successfully !!",
    data: allBooks,
  });
});

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating book details by is
 * Access: Public
 * Parameters:id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id == id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found for this id",
    });
  }

  const updateData = books.map((each) => {
    if (each.id == id) {
      return {
        ...each,
        ...data,
      };
    }

    return each;
  });

  return res.status(200).json({
    success: true,
    message: "Updated a book by their id",
    data: updateData,
  });
});

module.exports = router;
