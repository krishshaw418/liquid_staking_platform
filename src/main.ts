import { createServer } from "./server";
import { config } from "./config";
import { QueueEvents } from 'bullmq';

async function main(): Promise<void> {
    const app = createServer();
    
    app.listen(config.port, () => {
        console.log(`Listening at http://localhost:${config.port}`)
    });

    const queueEvents = new QueueEvents('SWAP');
    queueEvents.on('completed', ({ jobId }) => {
        console.log('Minting sucessful!');
    });

    queueEvents.on('failed',({ jobId, failedReason }: { jobId: string; failedReason: string }) => {
        console.error('Minting failed!', failedReason);
    });
};

main().catch((error) => {
    console.error("Error starting serving: ", error);
    process.exit(1);
})