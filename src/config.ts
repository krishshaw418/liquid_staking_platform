import "dotenv/config";
import { envSchema } from "./schema";

const parsed = envSchema.parse(process.env);

export const config = {
    port: parsed.PORT,
    solReserveAddress: parsed.SOL_RESERVE_ADDRESS,
    auth_secret: parsed.AUTH_SECRET,
    token_mint_address: parsed.TOKEN_MINT,
    mint_authority: parsed.MINT_AUTHORITY,
    mint_authority_private_key: parsed.MINT_AUTHORITY_PRIVATE_KEY,
    rpc_url: parsed.HELIUS_RPC_URL,
    redis_host: parsed.REDIS_HOST,
    redis_port: parsed.REDIS_PORT
}