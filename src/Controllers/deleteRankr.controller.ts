import { Request, Response } from "express";
import Rankr from "../Models/rankr";

export const deleteRankrController = async (req: Request, res: Response) => {
    try {
        const rankrId = req.params.id;

        if (!rankrId) {
            return res.status(400).json({ error: "Rank ID is required." });
        }

        const rankr = await Rankr.findOne({ where: { id: rankrId } });

        if (!rankr) {
            return res.status(404).json({ error: "Rank not found." });
        }

        await Rankr.destroy({ where: { id: rankrId } });

        return res.status(200).json({ message: "Rank deleted successfully." });
    } catch (error) {
        console.error("Error deleting rank:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
}