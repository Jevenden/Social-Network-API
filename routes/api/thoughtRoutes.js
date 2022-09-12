const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts).post(createNewThought);

router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// router
//   .route("/:id/thought/:thoughtId")
//   .post(addReaction)
//   .delete(deleteReaction);

module.exports = router;
