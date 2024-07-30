const express = require("express");
const { users } = require("../Data/Users.json");
const router = express.Router();

/**
 * Route: /
 * Method: GET
 * Description: Get All Users
 * Access: Public
 * Parameters: None
 */

const { Router } = require("express");

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    data: users,
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
 * Route: /
 * Method: POST
 * Description: Creating new user
 * Access: Public
 * Parameters: None
 */

router.post("/", (req, res) => {
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

/**
 * Route: /:id
 * Method: PUT
 * Description: Updating user by id
 * Access: Public
 * Parameters: id
 */

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosen't exist!!",
    });
  }
  const updateUserData = users.map((each) => {
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
    message: "User Updated !!",
    data: updateUserData,
  });
});

/**
 * Route: /:id
 * Method: DELETE
 * Description: Deleting user by id
 * Access: Public
 * Parameters: id
 */

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User dosen't exist !!",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);

  return res.status(200).json({
    success: true,
    message: "Deleted User...",
    data: users,
  });
});

/**
 * Route: /subscription-details/:id
 * Method: GET
 * Description: Get all user subscription details
 * Access: Public
 * Parameters: id
 */

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id == id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with this ID doesn't exist",
    });
  }

  const getDateInDays = (data = "") => {
    let date;

    if (data == "") {
      date = new Date();
    } else {
      date = new Date(data);
    }

    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType == "basic") {
      date = date + 90;
    } else if (user.subscriptionType == "standard") {
      date = date + 180;
    } else if (user.subscriptionType == "premium") {
      date = date + 365;
    }
    return date;
  };

  let returnDate = getDateInDays(user.returnDate);
  let currDate = getDateInDays();
  let subscriptionDate = getDateInDays(user.subscriptionDate);
  let subscriptionExpiration = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    IsSubscriptionExpired: subscriptionExpiration <= currDate,
    daysLeftForExpiration:
      subscriptionExpiration <= currDate
        ? 0
        : subscriptionExpiration - currDate,
    fine:
      returnDate < currDate
        ? subscriptionExpiration <= currDate
          ? 100
          : 50
        : 0,
  };

  return res.status(200).json({
    success: true,
    message: "Subscription details for the user is: ",
    data,
  });
});

module.exports = router;
