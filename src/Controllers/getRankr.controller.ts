import { Request, Response } from "express";
import Rankr from "../Models/rankr";
import Votes from "../Models/Votes";

export const getRankr = async (req: Request, res: Response) => {
    try {
        const rankId = req.params.id;

        if (!rankId) {
            return res.status(400).json({ error: "Rank ID is required." });
        }

        const rank = await Rankr.findOne({
            where: { id: rankId },
            attributes: {
                exclude: ["createdAt", "updatedAt", "userId"],
            },
        });

        if (!rank) {
            return res.status(404).json({ error: "Rank not found." });
        }

        const person_one_name = rank.person_one_name || "Person One";
        const person_two_name = rank.person_two_name || "Person Two";

        const person1Votecount = await Votes.count({
            where: {
                post_id: rankId,
                vote: person_one_name.toLowerCase(),
            },
        });

        const person2Votecount = await Votes.count({
            where: {
                post_id: rankId,
                vote: person_two_name.toLowerCase(),
            },
        });

        const totalVotes = await Votes.count({
            where: {
                post_id: rankId,
            },
        });

        return res.status(200).json({ rank, person1Votecount, person2Votecount, totalVotes });
    } catch (error) {
        console.error("Error fetching rank:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
};
