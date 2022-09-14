// Require connection attributes and routes
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// Set up port and app variables
const PORT = 3001;
const app = express();

// Defining routes for express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Setting up connection through mongoose
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
