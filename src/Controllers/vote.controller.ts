import { Request, Response } from "express";
import Votes from "../Models/Votes";
import { getUserIP } from "../Utils";

export const voteController = async (req: Request, res: Response) => {
    try {
        const { rankId, vote } = req.body;

        if (!rankId) {
            return res.status(400).json({ error: "Invalid request data." });
        }

        const ip = getUserIP(req);

        const hasVoted = await Votes.findOne({
            where: {
                post_id: rankId,
                userIp: ip,
            }
        });

        if (hasVoted) {
            return res.status(400).json({ error: "You have already voted." });
        }

        await Votes.create({
            post_id: rankId,
            vote: vote.toLowerCase(),
            userIp: ip,
        });

        return res.status(200).json({ message: "Vote recorded successfully." });
    } catch (error) {
        console.error("Error in voteController:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}