const { Note } = require('../models');

async function all(ctx, next) {
  const userID = ctx.params.uid;
  try {
    const notes = await Note.find({ userID }).sort({ createdAt: -1 });
    console.log(notes);
    ctx.ok(notes);
  } catch (err) {
    throw err;
  }
  await next();
}

async function getNote(ctx, next) {
  const userID = ctx.params.uid;
  const noteID = ctx.params.nid;
  try {
    const note = await Note.findOne({ userID, noteID });
    console.log(note);
    ctx.ok(note);
  } catch (err) {
    throw err;
  }
  await next();
}

async function postNote(ctx, next) {
  console.log(ctx.request.body);
  const { userID, note } = ctx.request.body;
  try {
    const newNote = await Note.create({ userID, note });
    // console.log(`Saved: ${newNote}`)
    ctx.ok(newNote);
  } catch (err) {
    throw err;
  }
  await next();
}

async function updateNote(ctx, next) {
  const noteID = ctx.params.nid;
  const { note } = ctx.request.body;
  try {
    const updatedNote = await Note.update({ _id: noteID }, { note });
    ctx.ok(updatedNote);
  } catch (err) {
    throw err;
  }
  await next();
}

async function deleteNote(ctx, next) {
  const noteID = ctx.params.nid;
  // const userID = ctx.params.uid;
  try {
    const deletedNote = await Note.findByIdAndDelete(noteID);
    ctx.ok(deletedNote);
  } catch (err) {
    throw err;
  }
  await next();
}

module.exports = {
  all,
  getNote,
  postNote,
  updateNote,
  deleteNote,
};
