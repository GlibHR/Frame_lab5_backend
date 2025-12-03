import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        // Шифруємо пароль перед збереженням
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, password: hashedPassword });
        await user.save();
        
        res.status(201).json({ message: "User created" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        
        // Перевірка пароля
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Створення токена (зберігаємо ID юзера в токені)
        const token = jwt.sign(
            { userId: user._id, username: user.username }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};