import { transporter } from "../Utils/mailing.utils";

export const notifyTeamOfReport = async (
  reportedRankrLink: string,
  name: string,
  email: string,
  complaint: string
) => {
  try {
    const mailOptions = {
      from: "Rankr <no-reply@rankr.me>",
      to: "rankr.me@gmail.com",
      subject: "🚨 Rankr Report Received",
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Rankr Report</title>
  <style>
    body {
      font-family: 'Inter', sans-serif;
      background: #fdfdfd;
      color: #000;
      padding: 2rem;
    }
    .container {
      background: #fff;
      padding: 1.5rem;
      border-radius: 10px;
      box-shadow: 0 5px 15px rgba(0,0,0,0.05);
      max-width: 600px;
      margin: auto;
    }
    .header {
      font-size: 1.5rem;
      font-weight: 700;
      color: #d40000;
      margin-bottom: 1rem;
    }
    .text {
      font-size: 1rem;
      margin-bottom: 1rem;
    }
    .link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.75rem 1.25rem;
      background-color: #000;
      color: #fff;
      text-decoration: none;
      border-radius: 8px;
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
    <div class="header">🚩 A Rankr Has Been Reported</div>
    <div class="text"><strong>Reporter Name:</strong> ${name}</div>
    <div class="text"><strong>Reporter Email:</strong> ${email}</div>
    <div class="text"><strong>Complaint:</strong> ${complaint}</div>
    <div class="text">
      <strong>Link:</strong> 
      <a href="https://userankr.vercel.app/rank/${reportedRankrLink}" target="_blank">
        https://userankr.vercel.app/rank/${reportedRankrLink}
      </a>
    </div>
    <a class="link" style="color: #fff;" href="https://userankr.vercel.app/rank/${reportedRankrLink}" target="_blank">View Reported Rankr</a>
    <div class="footer">
      Please review this Rankr as soon as possible. 🚨
    </div>
  </div>
</body>
</html>`
    };

    transporter.sendMail(mailOptions, async (error: any, info: any) => {
      if (error) {
        console.error("Error sending report email:", error);
      } else {
        return true;
      }
    });
  } catch (error) {
    return "Error sending report notification";
  }
};
