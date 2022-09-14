const { Schema, model } = require("mongoose");

// Perameters for the user schema; taking in the user name, email (with validation), and populating with thoughts and friends.
const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thoughts",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// A virtual to get the user's friend count
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const Users = model("users", userSchema);

module.exports = Users;
