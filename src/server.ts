import { config } from "./config";
import express, { Request, Response } from "express";
import { authenticateRequest } from "./auth";
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotent,
  mintToChecked,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { readFileSync } from 'fs';
import bs58 from "bs58";
import { nativeTransfersSchema } from "./schema";

export function createServer() {
    const app = express();

    app.use(express.json());

    app.get("/health", (_req: Request, res: Response) => {
        res.status(200).json({
            message: "Server is running...",
            solReserveAddress: config.solReserveAddress
        });
    });

    app.post("/swap", authenticateRequest, async (req: Request, res: Response) => {

        const parsed = nativeTransfersSchema.safeParse(req.body[0].nativeTransfers);
        
        if (!parsed.success) {
            return res.status(400).json({ message: "Invalid response body" })
        }
        
        const parsedObj = parsed.data[0];
        if (!parsedObj) {
            return res.status(400).json({ message: "Invalid response body" })
        }

        const mintAddress = config.token_mint_address;
        const mintPubkey = new PublicKey(mintAddress);
        const feePayerPrivKey = JSON.parse(readFileSync("./priv_key.json", 'utf-8'));
        const feePayer = Keypair.fromSecretKey(Uint8Array.from(feePayerPrivKey));
        const connection = new Connection(config.rpc_url);
        const base58Key = config.mint_authority_private_key;
        const mintAuthority = Keypair.fromSecretKey(bs58.decode(base58Key));

        try {

            // 1. Creating an ATA for the staker to hold cSOL
            const associatedTokenAccount = await createAssociatedTokenAccountIdempotent(
                connection,
                feePayer,
                mintPubkey,
                new PublicKey(parsedObj?.fromUserAccount),
                {
                    commitment: "confirmed"
                },
                TOKEN_PROGRAM_ID
            );

            // 2. Minting the cSOL to the staker
            const mintResult = await mintToChecked(
                connection,
                feePayer,
                mintPubkey,
                associatedTokenAccount,
                mintAuthority,
                parsedObj.amount,
                9,
                [],
                { commitment: 'confirmed' },
                TOKEN_PROGRAM_ID,
            );

            return res.status(200).json({
                mintTxSig: mintResult
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Something went wrong!" });
        }
    })

    return app;
}
