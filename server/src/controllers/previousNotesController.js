const { listNotes, createNote, deleteNote } = require('../services/previousNotesService');

const list = async (req, res, next) => {
  try {
    const notes = await listNotes(req.user.userId, req.params.patientId);
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Content is required' });
    }
    const note = await createNote(req.user.userId, req.params.patientId, content.trim());
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    await deleteNote(req.user.userId, req.params.noteId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { list, create, remove };
