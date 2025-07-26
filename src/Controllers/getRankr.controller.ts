import { Request, Response } from "express";
import Rankr from "../Models/rankr";
import Votes from "../Models/Votes";

export const getRankr = async (req: Request, res: Response) => {
    try {
        const rankrId = req.params.id;

        if (!rankrId) {
            return res.status(400).json({ error: "Rank ID is required." });
        }

        const rank = await Rankr.findOne({
            where: { id: rankrId },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });

        if (!rank) {
            return res.status(404).json({ error: "Rank not found." });
        }

        const person1Votecount = await Votes.count({
            where: {
                post_id: rankrId,
                vote: 1,
            },
        });

        const person2Votecount = await Votes.count({
            where: {
                post_id: rankrId,
                vote: 2,
            },
        });

        const totalVotes = await Votes.count({
            where: {
                post_id: rankrId,
            },
        });

        return res.status(200).json({ rank, person1Votecount, person2Votecount, totalVotes });
    } catch (error) {
        console.error("Error fetching rank:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
