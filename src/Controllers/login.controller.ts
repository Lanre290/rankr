import { Request, Response } from "express";
import User from "../Models/users";
import bcrypt from "bcrypt";
import { loginSchema } from "../Services/zod.services";
const jwt = require("jsonwebtoken");

export const loginController = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    
    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required" });
    }

    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid password" });
    }   

    delete user.password;
    
    const token = jwt.sign({ id: user.id, username: user.username, image_url: user.image_url }, process.env.JWT_SECRET, { expiresIn: "20d" });


    res.status(200).json({ message: "Login successful", user: user, token });
};
