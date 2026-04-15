import { Connection, Keypair, PublicKey } from "@solana/web3.js";
import {
  createAssociatedTokenAccountIdempotent,
  mintToChecked,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { readFileSync } from 'fs';
import bs58 from "bs58";
import { config } from "./config";


export async function MintLST(
    data: {
        amount: bigint,
        fromUserAccount: string,
        toUserAccount: string
    }
) {
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
            new PublicKey(data.fromUserAccount),
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
            data.amount,
            9,
            [],
            { commitment: 'confirmed' },
            TOKEN_PROGRAM_ID,
        );

        console.log("TxSig: ", mintResult);
    } catch (error: any) {
        throw new Error("Error from MintLST", error);
    }
}