const { Users, Thoughts } = require("../models");

module.exports = {
  // Route to get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .select("-__v")
      .then((dbThoughtsData) => res.json(dbThoughtsData))
      .catch((err) => {
        console.error({ message: err });
        return res.status(500).json(err);
      });
  },
    // Route to get a single thought by ID
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .select("-__v")
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought found with that id." });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to get create a new thought
  createNewThought({ body }, res) {
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
            .json({ message: "No user found with that id." });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
    // Route to update an existing thought by ID
  updateThought({ params, body }, res) {
    Thoughts.findByIdAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtsData) => {
        if (!dbThoughtsData) {
          res
            .status(404)
            .json({ message: "No thought found with that id." });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
    // Route to delete an existing thought by ID
  deleteThought({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought found with that id." });
          return;
        }
        res.json({message: "Thought deleted."});
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to add a new reaction
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No thought found with that id." });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
  // Route to delete an existing thought by ID
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res
            .status(404)
            .json({ message: "No reaction found with that id." });
          return;
        }
        res.json("Reaction deleted.");
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  },
};
