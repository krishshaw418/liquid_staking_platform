import { config } from "./config";
import { Request, Response, NextFunction } from "express";

export function authenticateRequest(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    console.log(authHeader);

    if (!authHeader) {
        return res.status(401).json({ message: "Unauthorsized request!" });
    }

    if (authHeader !== config.auth_secret) {
        return res.status(401).json({ message: "Invalid credentials!" });
    }
    return next();
}