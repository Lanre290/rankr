import { Request, Response } from "express";
import Votes from "../Models/Votes";

export const clearVotes = async (req: Request, res: Response) => {
    try {
        const { rankr_id } = req.params;

        if(!rankr_id) {
            return res.status(400).json({ error: "Rankr ID is required." });
        }

        await Votes.destroy({ where: { post_id: rankr_id } });

        return res.status(200).json({ message: "All votes cleared successfully." });
    } catch (error) {
        console.error("Error clearing votes:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}