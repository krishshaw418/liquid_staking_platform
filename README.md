# Liquid Staking Platform

A centralized liquid staking platform for Solana that allows users to stake SOL and receive cSOL (liquid staking tokens) in return.

## Features

- **Liquid Staking**: Stake SOL and receive cSOL tokens
- **SPL Token 2022 Integration**: Built on Solana's SPL token 2022 standard
- **Real-time Webhooks**: Helius-powered webhook integration for instant transaction monitoring
- **Secure Reserve Management**: Dedicated SOL reserve wallet for secure fund management

## Getting Started Locally

### Prerequisites
- [Bun](https://bun.com) runtime installed
- Docker installed
- Git installed
- ngrok CLI installed for tunneling
- Helius account for RPC and webhook services

### Step-by-Step Setup

1. **Create an SPL Token (cSOL - Liquid Staking Token)**
   - Create a new SPL token that represents your liquid staking asset (e.g., cSOL)

2. **Create a SOL Reserve Wallet**
   - Create a dedicated wallet address to serve as the SOL reserve

3. **Clone the Repository**
   ```bash
   git clone https://github.com/krishshaw418/liquid_staking_platform.git
   cd liquid_staking_platform
   ```

4. **Install Dependencies**
   ```bash
   bun install
   ```

5. **Configure Environment Variables**
   - Create a `.env` file in the project root as per the `.env.example`
   - Add your RPC URL from [Helius](https://helius.dev)
   - Example:
     ```
     HELIUS_RPC_URL=your_helius_rpc_url
     SOL_RESERVE_ADDRESS=your_reserve_wallet_address
     ```

6. **Start Redis**
   - Pull and run Redis in detached mode:
   ```bash
   docker pull redis:latest
   docker run -d --name redis -p 6379:6379 redis:latest
   ```

7. **Start the Development Server**
   ```bash
   bun dev
   ```
   The server will start on `http://localhost:3000`

8. **Set Up ngrok Tunnel**
   - Install [ngrok CLI](https://ngrok.com/download)
   - Start a secure tunnel to your localhost:
   ```bash
   ngrok http 3000
   ```
   - Note the ngrok URL (e.g., `https://xxxx-xx-xxx-xxx-xx.ngrok.io`) for webhook configuration

9. **Get RPC URL from Helius**
   - Visit [Helius.dev](https://helius.dev)
   - Create an account and generate an RPC URL for the Solana blockchain

10. **Configure Helius Webhook**
    - Log into Helius dashboard
    - Set up webhook service to monitor `Transfer` events to your SOL reserve address
    - Configure the webhook URL to point to your ngrok tunnel URL with the `/swap` endpoint
    - Example: `https://xxxx-xx-xx-xx-xxx.ngrok-free.app/swap`

### Testing Your Setup

1. Transfer some SOL from another wallet to your SOL reserve wallet
2. Monitor the webhook logs in your development console to confirm the transfer is detected
3. Verify that cSOL tokens are minted to the sender's address

## Technology Stack

- **Runtime**: [Bun](https://bun.com) - Fast JavaScript runtime
- **Blockchain**: Solana
- **RPC Provider**: [Helius](https://helius.dev)
- **Webhook Service**: Helius webhooks for real-time monitoring
- **Event Queue**: BullMQ (Redis)
- **Token Standard**: SPL Token 2022
