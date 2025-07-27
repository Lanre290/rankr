import { Request, Response } from "express";
import Comments from "../Models/Comments";

export const fetchCommentsController = async (req: Request, res: Response) => {
    try {
        const rankrId = req.params.rankrId;

        if (!rankrId) {
            return res.status(400).json({ error: "Rankr ID is required." });
        }

        const comments = await Comments.findAll({ where: { postId: rankrId } });

        return res.status(200).json({ comments });

    } catch (error) {
        console.error("Error fetching comments:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}