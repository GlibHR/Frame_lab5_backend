import { Note } from "../models/Note.js";

export const createNote = async (req, res) => {
    try {
        const note = new Note({ ...req.body, userId: req.user.userId });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getMyNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.userId });
        res.json(notes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    // Видаляємо нотатку ТІЛЬКИ якщо вона належить цьому юзеру
    const deleted = await Note.findOneAndDelete({ _id: id, userId: req.user.userId });

    if (!deleted) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};