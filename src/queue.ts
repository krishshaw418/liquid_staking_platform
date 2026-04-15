import { Queue } from "bullmq";
import { config } from "./config";

// class to create & hold single Queue instance 
class TaskQueue {
    private static instance: Queue;

    public static getInstance(): Queue {
        if (!TaskQueue.instance) {
            TaskQueue.instance = new Queue('SWAP', {
                connection: {
                    host: config.redis_host,
                    port: config.redis_port
                }
            });
        }

        return TaskQueue.instance;
    }
}

export const queue = TaskQueue.getInstance();