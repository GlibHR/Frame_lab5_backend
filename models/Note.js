import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    }, // Прив'язка нотатки до конкретного юзера
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Note = mongoose.model("Note", noteSchema);