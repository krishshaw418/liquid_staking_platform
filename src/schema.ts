import { z } from "zod";

export const envSchema = z.object({
    PORT: z.coerce.number().positive().default(8080),
    AUTH_SECRET: z.base64(),
    SOL_RESERVE_ADDRESS: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string"),
    TOKEN_MINT: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string"),
    MINT_AUTHORITY: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string"),
    MINT_AUTHORITY_PRIVATE_KEY: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string"),
    HELIUS_RPC_URL: z.url()
});

export const nativeTransfersSchema = z.array(z.object({
    amount: z.coerce.bigint({ error: "Invalid ammount type!" }),
    fromUserAccount: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string"),
    toUserAccount: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string")
}));
