# KAIA Campaign Platform

A decentralized crowdfunding platform built on blockchain technology that allows users to create and contribute to fundraising campaigns using KAIA tokens.

## Features

- Create fundraising campaigns with customizable:
  - Title and description
  - Funding target amount
  - Campaign duration
  - Campaign image
- Donate KAIA tokens to campaigns
- Track campaign progress and statistics
- Withdraw funds (for campaign creators)
- Withdraw donations ( for donator if not reach target )
- View all campaign contributors
- Real-time campaign status updates


## Tech Stack

- **Frontend:**
  - Next.js 14 (React)
  - TypeScript
  - TailwindCSS
  - shadcn/ui Components

- **Blockchain Integration:**
  - Wagmi
  - RainbowKit
  - Ethereum Smart Contracts

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/Lou1sVuong/kaia-impact
cd kaia-campaign
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Smart Contract Integration

The platform interacts with the following main smart contract functions:

- `createCampaign`: Create a new fundraising campaign
- `donateToCampaign`: Contribute KAIA tokens to a campaign
- `withdrawFunds` : Withdraw funds ( for creator )
- `withdrawDonations`: Withdraw contributed donations ( for donators )
- `getCampaigns`: Fetch all campaign data


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.