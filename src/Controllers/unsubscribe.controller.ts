import { Request, Response } from "express";
import User from "../Models/users";
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

export const unsubscribeController = async (req: Request, res: Response) => {
    try {
        const { token } = req.query;
        let email;
        
        if (!token) {
            return res.status(400).json({ error: "Token is required." });
        }

        try {
            const decoded = jwt.verify(token, SECRET_KEY);
            email = decoded.email;
        } catch (err) {
            console.error("Invalid token", err);
            return res.status(400).json({ error: "Invalid token." });
        }

        if(!email) {
            return res.status(400).json({ error: "Invalid token." });
        }

        await User.update({ newsletter: false }, 
            { where: { email } }
        ).then(() => {
            
            return res.status(200).json({ message: "You have been unsubscribed successfully." });
        }).catch((error) => {
            console.error("Error unsubscribing user:", error);
            return res.status(500).json({ error: "Internal server error." });
        });
    } catch (error) {
        console.error("Error in unsubscribeController:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}