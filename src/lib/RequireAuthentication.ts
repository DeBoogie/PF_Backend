import { Request, Response, NextFunction } from "express";
import Token from "./Token";

export const RequireAuthentication = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ success: false, message: "Token Missing." });
    }

    const tokenVerifier = new Token();
    if (await tokenVerifier.verifyToken(token)) {
        next();
    } else {
        return res.status(403).json({ success: false, message: "Invalid Token." });
    }
};
