import { Request } from "express";

export const processExpiryDate = (expiryDate: string): number => {
    const match = expiryDate.match(/^(\d+)([dh])$/);
    if (!match) throw new Error('Invalid expiry date format');
    const value = parseInt(match[1], 10);
    const unit = match[2];
    let seconds = 0;
    if (unit === 'd') {
        seconds = value * 24 * 60 * 60;
    } else if (unit === 'h') {
        seconds = value * 60 * 60;
    }
    
    const now = Date.now();
    // Alternatively, if you want to return a timestamp:
    return now + seconds * 1000;
    // return new Date(now + seconds * 1000);
}

export const getUserIP = (req: Request) => {
  const forwarded = req.headers['x-forwarded-for'];
  return typeof forwarded === 'string'
    ? forwarded.split(',')[0].trim()
    : req.socket?.remoteAddress || null;
};