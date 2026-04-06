const mongoose =
require("mongoose");

const projectSchema =
new mongoose.Schema({

  name: {

    type: String,

    required: true

  },

  prompt: {

    type: String,

    required: true

  },

  zipPath: {

    type: String

  },

  createdAt: {

    type: Date,

    default: Date.now

  }

});

module.exports =
mongoose.model(
  "Project",
  projectSchema
);