const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    userID: String,
    note: String,
  },
  { timestamps: true },
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
