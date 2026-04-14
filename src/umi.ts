import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { Umi } from '@metaplex-foundation/umi';
import { config } from './config';

class UmiInstance {

    private static instance: UmiInstance | null = null;
    private umiInstance: Umi;

    private constructor() {
        this.umiInstance = createUmi(config.rpc_url);
    }

    static getInstance(): UmiInstance {
        if (!UmiInstance.instance) {
            UmiInstance.instance = new UmiInstance();
        }

        return UmiInstance.instance;
    }

    getUmiInstance(): Umi {
        return this.umiInstance;
    }
}

export const umiInstance = UmiInstance.getInstance().getUmiInstance();