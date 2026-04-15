import { config } from "./config";
import express, { Request, Response } from "express";
import { authenticateRequest } from "./auth";
import { nativeTransfersSchema } from "./schema";
import { queue } from "./queue";

export function createServer() {
    const app = express();

    app.use(express.json());

    app.get("/health", (_req: Request, res: Response) => {
        res.status(200).json({
            message: "Server is running...",
            solReserveAddress: config.solReserveAddress
        });
    });

    app.post("/swap", authenticateRequest, (req: Request, res: Response) => {

        const parsed = nativeTransfersSchema.safeParse(req.body[0].nativeTransfers);
        
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid response body" })
        }
        
        const parsedObj = parsed.data[0];
        if (!parsedObj) {
            return res.status(400).json({ message: "Invalid response body" })
        }

        try {
            queue.add('Mint cSOL to Staker', JSON.stringify({
                ...parsedObj,
                amount: parsedObj.amount.toString()
            }));
        } catch (error) {
            console.error("Error in /swap: ", error);
        }

        return res.status(200).json({ message: "Tasked added to the queue!" });
    })

    return app;
}
