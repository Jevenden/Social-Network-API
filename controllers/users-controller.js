const { Users } = require("../models");

module.exports = {
  getAllUsers(req, res) {
    Users.find({})
      //   .populate({ path: "friends" })
      //   .populate({ path: "thoughts" })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  createNewUser(req, res) {
    Users.create(req.body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
  },
  getUserById({ params }, res) {
    Users.findOne({ _id: params.id })
      //   .populate({ path: "friends" })
      //   .populate({ path: "thoughts" })
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
};
