const { Users, Thoughts } = require("../models");

module.exports = {
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbUsersData) => res.json(dbUsersData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
  createNewThought({ params, body }, res) {
    Thoughts.create(body)
      .then((dbThoughtData) => {
        return Users.findOneAndUpdate(
          { userName: body.userName },
          { $push: { thoughts: dbThoughtData } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res
            .status(404)
            .json({ message: "Ain't no one here with that ID, playa." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "Ain't no thought with that id, playa." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
