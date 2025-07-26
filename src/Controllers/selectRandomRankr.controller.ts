import { Request, Response } from "express";
import Rankr from "../Models/rankr";
import { Sequelize } from "sequelize";
import Votes from "../Models/Votes";

export const selectRandomRankr = async (req: Request, res: Response) => {
    try {
        const rankrs = await Rankr.findAll({
            where: { is_public: true },
            order: Sequelize.literal('RAND()'),
            limit: 1
        });

        const rankr = rankrs.length > 0 ? rankrs[0] : null;
        const rankrId = rankr ? rankr.id : null;
        const person1_name = rankr ? rankr.person_one_name || "Person One" : "Person One";
        const person2_name = rankr ? rankr.person_two_name || "Person Two" : "Person Two";

        const person1Votecount = await Votes.count({
            where: {
                post_id: rankrId,
                vote: person1_name.toLowerCase(),
            },
        });

        const person2Votecount = await Votes.count({
            where: {
                post_id: rankrId,
                vote: person2_name.toLowerCase(),
            },
        });

        const totalVotes = await Votes.count({
            where: {
                post_id: rankrId,
            },
        });

        if (!rankr) {
            return res.status(404).json({ error: "No ranks available." });
        }

        return res.status(200).json({ rankr, person1Votecount, person2Votecount, totalVotes });
    } catch (error) {
        console.error("Error in selectRandomRankr:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}