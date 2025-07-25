import express from 'express';
import sequelize from './Config/Sequelize';
import { upload } from './Services/Multer.services';
import SignupController from './Controllers/signup.controller';
import { createRank } from './Controllers/createRank.controller';
import AuthMiddleware from './Middlewares/Auth.middleware';
import { loginController } from './Controllers/login.controller';
import { voteController } from './Controllers/vote.controller';
import { getRankr } from './Controllers/getRankr.controller';
const dotenv = require("dotenv");
const session = require("express-session");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();


dotenv.config();

const FRONTEND_URL: any = process.env.FRONTEND_URL;
const PORT = process.env.PORT || 8000;

interface corsInterface {
  origin: string;
  methods: string[];
  allowedHeaders?: string[];
}

const allowedCorsUrls = FRONTEND_URL
    ? FRONTEND_URL.split(',')
    : [];

console.log(allowedCorsUrls);

const corsOption: corsInterface = {
  origin: allowedCorsUrls,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOption));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV == 'dev' ? 'false' : 'true' },
  })
);


app.post("/api/v1/signup", upload.single('user_image'), SignupController);
app.post("/api/v1/rankr", upload.fields([
    { name: "person1", maxCount: 1 },
    { name: "person2", maxCount: 1 },
  ]), createRank);
app.post("/api/v1/login", loginController);
app.post("/api/v1/vote", voteController);
app.get("/api/v1/rankr/:id", getRankr);




const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection established");

    if(process.env.DB_FORCE === 'true') {
      await sequelize.sync({ force: true });
        console.log("Database Cleared and synced");
    }
    else{
        await sequelize.sync({ alter: true });
        console.log("Database synced");
    }
    console.log("Starting server...");

    app.listen(PORT, () => {
      console.log(`Server is listening on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Startup error:", error);
  }
};

startServer();