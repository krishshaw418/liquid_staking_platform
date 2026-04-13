import { config } from "./config";
import express, { Request, Response } from "express";

export function createServer() {
    const app = express();

    app.use(express.json());

    app.get("/health", (_req: Request, res: Response) => {
        res.status(200).json({
            message: "Server is running...",
            solReserveAddress: config.solReserveAddress
        });
    });

    app.post("/echo", (req: Request, res: Response) => {

        const { message } = req.body;

        res.status(200).json({
            message
        });
    })

    return app;
}
