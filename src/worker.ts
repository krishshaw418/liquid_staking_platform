import { Worker } from 'bullmq';
import { MintLST } from './service';
import { config } from './config';

export const worker = new Worker('SWAP', async job => {
    if (job.name === 'Mint cSOL to Staker') {
        try {
            if (job.data) {
                const parsed = JSON.parse(job.data);

                const amount = BigInt(parsed.amount);

                await MintLST({
                    ...parsed,
                    amount
                });
            } else {
                console.log("Found no data to process!");
            }
        } catch (error) {
            console.error("Error: ", error);
            return;
        }
    }
}, {
    connection: {
        host: config.redis_host,
        port: config.redis_port
    }
});

worker.on('ready', () => {
    console.log("Worker ready and listening for jobs...");
});