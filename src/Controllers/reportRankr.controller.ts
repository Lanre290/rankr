import { Request, Response } from "express";
import { notifyTeamOfReport } from "../Mailing/reportMail";

const reportRankrController = async (req: Request, res: Response) => {
    try {
        const { name, email, complaint, rankrId } = req.body;

        if (!rankrId) {
            return res.status(400).json({ error: "Rankr ID is required." });
        }

        notifyTeamOfReport(rankrId, name, email, complaint);

        return res.status(200).json({ message: "Report submitted successfully. Our team will review it shortly." });
    } catch (error) {
        console.error("Error in reportRankrController:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default reportRankrController;