const { Users, Thoughts } = require("../models");

module.exports = {
  // Route to get all users
  getAllUsers(req, res) {
    Users.find({})
      .populate({ path: "friends" })
      .populate({ path: "thoughts" })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  // Route to create a new user
  createNewUser(req, res) {
    Users.create(req.body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
  },
  // Route to get one user by ID
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      .populate({ path: "friends" })
      .populate({ path: "thoughts" })
      .select("-__v")
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Ain't no one here with that name, playa." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to update an existing user
  updateUser({ params, body }, res) {
    Users.findByIdAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Ain't no one here with that id, playa." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to delete an existing user and all associated thoughts
  deleteUser({ params }, res) {
    Users.findOneAndDelete({ _id: params.id }, { new: true })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "Sorry; there is no user with that ID." })
          : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "User and associated thoughts deleted." })
      )
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to add a new friend
  addFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Ain't no one here with that id, playa." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to delete an existing friend
  deleteFriend({ params }, res) {
    Users.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUsersData) => {
        if (!dbUsersData) {
          res
            .status(404)
            .json({ message: "Ain't no one here with that id, playa." });
          return;
        }
        res.json(dbUsersData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
