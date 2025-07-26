import User from "../Models/users";

const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const AuthMiddleware ={
    verifyToken: (req: any, res: any, next: any) => {
        const header = req.headers['authorization'];
        
        if(!header || !header.startsWith('Bearer ') || !SECRET_KEY) {
          return res.status(401).json({ message: 'Unauthorized access.' });
        }

        const token = header?.split(' ')[1];
        if (!token) {
          return res.status(401).json({ message: 'Unauthorized access.' });
        }
      
        jwt.verify(token, SECRET_KEY, async (err: any, decoded: any) => {
          if (err) {
            return res.status(401).json({ message: 'Unauthorized access.' });
          }
          req.user = decoded;
          console.log("Decoded user:", decoded);
      
          const email = decoded?.email;
          if (!email) {
            return res.status(401).json({ success: false, error: "Unauthorized access." });
          }
      
          const user = await User.findOne({ where: { email } });
          
          if (!user) {
              return res.status(401).json({ success: false, error: "Unauthorized access." });
          }
      
          next();
        });
      }
}
export default AuthMiddleware;