import { createServer } from "./server";
import { config } from "./config";

async function main(): Promise<void> {
    const app = createServer();
    
    app.listen(config.port, () => {
        console.log(`Listening at http://localhost:${config.port}`)
    })
};

main().catch((error) => {
    console.error("Error starting serving: ", error);
    process.exit(1);
})