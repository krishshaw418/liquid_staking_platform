import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    PORT: z.coerce.number().positive().default(8080),
    SOL_RESERVE_ADDRESS: z.string().regex(/^[1-9A-HJ-NP-Za-km-z]+$/, "Invalid Base58 string").default("HTYGxbXeurLZuxyCjB55fxQuvk3p2iwB6Fz3XHZLaQ1z")
});

const parsed = schema.parse(process.env);

export const config = {
    port: parsed.PORT,
    solReserveAddress: parsed.SOL_RESERVE_ADDRESS
}