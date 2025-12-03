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