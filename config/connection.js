const { connect, connection } = require("mongoose");

// Setting up the mongoose connection and database
connect("mongodb://localhost/socialAPI", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
