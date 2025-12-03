import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, required: true, minlength: 6 }, // Пароль буде захешований
});

export const User = mongoose.model("User", userSchema);