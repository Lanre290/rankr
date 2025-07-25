import { Request, Response } from "express";
import { afterVerificationMiddlerwareInterface } from "../interfaces/index";
import { uploadRankr } from "../Services/cloudflare.services";
import Rankr from "../Models/rankr";
import { processExpiryDate } from "../Utils";

export const createRank = async (
        req: Request & afterVerificationMiddlerwareInterface,
        res: Response
    ) => {
        try {
            const { name_one, name_two, title, description, location, expiresAt, is_public } = req.body;

            if(!name_one || !name_two || !title || !is_public){
                return res.status(400).json({error: 'Bad request.'});
            }

            name_one.trim().toLowerCase();
            name_two.trim().toLowerCase();

            if (name_one === name_two) {
                return res.status(400).json({ error: "Both names cannot be the same." });
            }

            const files = req.files as {
                [fieldname: string]: Express.Multer.File[];
            };

            const person1 = files?.["person1"]?.[0];
            const person2 = files?.["person2"]?.[0];

            if (!person1 || !person2) {
                return res
                    .status(400)
                    .json({ error: "Both image files are required." });
            }

            const safeKey = (file: Express.Multer.File) =>
                `${Date.now()}_${file.originalname}`.replace(/[^a-zA-Z0-9.]/g, "_");

            const person1_url = await uploadRankr(
                safeKey(person1),
                person1.buffer,
                person1.mimetype
            );
            const person2_url = await uploadRankr(
                safeKey(person2),
                person2.buffer,
                person2.mimetype
            );

            const processedExpiryDate = expiresAt ? processExpiryDate(expiresAt) : null;

            const post = await Rankr.create({
                title,
                description,
                location,
                is_public: is_public,
                person_one_image_url: person1_url,
                person_two_image_url: person2_url,
                person_one_name: name_one,
                person_two_name: name_two,
                expiresAt: processedExpiryDate,
            });

            return res.status(201).json({
                message: "Rankr created successfully",
                rankr: post,
            });
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }