import { Request, Response } from "express";
import Comments from "../Models/Comments";

export const saveCommentController = async (req: Request, res: Response) => {
    try {
        const { postId, comment } = req.body;

        if (!postId || !comment) {
            return res.status(400).json({ error: "Post ID and comment are required." });
        }

        const newComment = await Comments.create({
            postId,
            comment
        });

        return res.status(201).json({ message: "Comment saved successfully.", comment: newComment });
    } catch (error) {
        console.error("Error saving comment:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}