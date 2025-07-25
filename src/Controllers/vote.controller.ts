import { Request, Response } from "express";
import Votes from "../Models/Votes";

export const voteController = async (req: Request, res: Response) => {
    try {
        const { rankId, vote } = req.body;

        if (!rankId) {
            return res.status(400).json({ error: "Invalid request data." });
        }

        Votes.create({
            post_id: rankId,
            vote: vote.toLowerCase(),
        });

        return res.status(200).json({ message: "Vote recorded successfully." });
    } catch (error) {
        console.error("Error in voteController:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}