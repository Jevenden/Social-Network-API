const { Users, Thoughts } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      //   .populate({ path: "friends" })
      //   .populate({ path: "thoughts" })
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  createNewThought(req, res) {
    Thoughts.create(req.body)
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => res.status(500).json(err));
  },
};
