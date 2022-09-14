// Importing variables
const router = require("express").Router();
const apiRoutes = require("./api");

// Setting up routes
router.use("/api", apiRoutes);

router.use((req, res) => {
  return res.send("Your route sucks, dude.");
});

module.exports = router;
