 import { transporter } from "../Utils/mailing.utils";


 const BASE_URL = process.env.BASE_URL || "http://localhost:4000";
  export const sendWelcomeEmail = async (email: string, token:string) => {
    try {
      const mailOptions = {
        from: "Rankr <no-reply@rankr.me>",
        to: email,
        subject: "Welcome to Rankr",
        html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Rankr</title>
  <style>
    a{
      color: #000;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #fafafa;
      color: #000000;
    }
    .container {
      max-width: 520px;
      margin: 0 auto;
      background: #fff;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.05);
    }
    .title {
      font-size: 1.8rem;
      font-weight: 700;
      margin-bottom: 1rem;
      color: #000;
    }
    .emoji {
      font-size: 2rem;
    }
    .intro {
      font-size: 1rem;
      margin-bottom: 1rem;
      color: #000;
    }
    .cta {
      display: inline-block;
      margin-top: 1.5rem;
      padding: 0.75rem 1.25rem;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 10px;
      font-weight: 500;
    }
    .footer {
      margin-top: 2rem;
      font-size: 0.85rem;
      color: #888;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="emoji">🔥</div>
    <div class="title">Welcome to Rankr</div>
    <div class="intro">
      You just joined the most addictive popularity war on the internet.<br><br>
      People will vote. Your name will rise...  or fall. The only rule? You can't vote for yourself.
    </div>
    <div class="cta" href="https://userankr.vercel.app">Start Ranking</div>
    <div class="footer">
      Not feeling the heat? You can <a href="${BASE_URL}/unsubscribe?token=${token}">unsubscribe</a> anytime. But like… why would you?
    </div>
  </div>
</body>
</html>
`
      };
  
      transporter.sendMail(mailOptions, async (error: any, info: any) => {
        if (error) {
          console.log("error");
        } else {
          return true;
        }
      });
    } catch (error) {
      return "Error sending mail";
    }
  };