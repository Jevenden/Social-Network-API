const router = require("express").Router();

// Creating routes for every thought option
const {
  getAllThoughts,
  getThoughtById,
  createNewThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughts-controller");

// Basic Get and Post for thoughts
router.route("/").get(getAllThoughts).post(createNewThought);

// Get, Put, and Delete a thought by ID
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Post a new reaction
router.route("/addReaction/thought/:thoughtId").post(addReaction);

// Delete an existing reaction
router
  .route("/removeReaction/:reactionId/thought/:thoughtId")
  .delete(deleteReaction);

module.exports = router;
