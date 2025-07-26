import User from "../Models/users";
import { uploadUserPicture } from "../Services/cloudflare.services";
import { userSchema } from "../Services/zod.services";
const jwt = require("jsonwebtoken");


const SignupController = async (req: any, res: any) => {
    const { username, email } = req.body;
    const user_image = req.file;
    let image_url: string | undefined;

    if(!username || !email) {
        return res.status(400).json({ error: "Username and email are required" });
    }
    
    const result = userSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ errors: result.error.flatten().fieldErrors });
    }

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
        return res.status(400).json({ error: "Username already exists" });
    }

    if (user_image && user_image.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: "File size exceeds 5MB." });
    }

    if(user_image){
        let key = `${Date.now()}_${user_image.originalname}`;
        const mimeType = user_image.mimetype;
        
        key = key.replace(/[^a-zA-Z0-9.]/g, "_");

        image_url = await uploadUserPicture(key, user_image.buffer, mimeType);
    }

    await User.create({
        username,
        email,
        image_url: image_url || 'https://pub-da4dbd6273d846849afa17bbbe263db6.r2.dev/rankr_default_image.png',
    }).then(async (user) => {
        const token = jwt.sign({ id: user.id, username: user.username, image_url: user.image_url }, process.env.JWT_SECRET, { expiresIn: "20d" });

        res.status(201).json({ message: "User created successfully", user, token });
    }).catch((error) => {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Internal server error" });
    });



    res.status(200).json({ message: "Signup successful" });
}

export default SignupController;