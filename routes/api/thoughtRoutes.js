const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updatethought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts);

// .post(createNewThought);

// router
//   .route("/:id")
//   .get(getThoughtById)
//   .put(updatethought)
//   .delete(deleteThought);

// router
//   .route("/:id/thought/:thoughtId")
//   .post(addReaction)
//   .delete(deleteReaction);

module.exports = router;
