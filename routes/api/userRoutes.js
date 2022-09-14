const router = require("express").Router();

// Creating routes for every user option
const {
  getAllUsers,
  getUserById,
  createNewUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/users-controller");

// Basic Get and Post for users
router.route("/").get(getAllUsers).post(createNewUser);

// Get, Put, and Delete a user by ID
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// Create or Delete a friend
router.route("/:id/friends/:friendsId").post(addFriend).delete(deleteFriend);

module.exports = router;
