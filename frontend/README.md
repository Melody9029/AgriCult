# AgriCult - Dutch Auction Platform

A decentralized Dutch auction platform for agricultural products, built with Next.js, Wagmi, and Privy.

## Features

- Web3 Authentication with Privy
- Dutch Auction Mechanism for Agricultural Products
- Real-time Price Updates
- NFT-based Product Ownership
- Secure Smart Contract Integration

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file:
```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id_here
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Smart Contract

The platform uses a custom RWASingleton smart contract deployed at:
`0x8aad8bd0112dff26d2B08eF690434ff1c0E44Bb3`

## Environment Variables

- `NEXT_PUBLIC_PRIVY_APP_ID`: Your Privy application ID (required for authentication)

## Deployment

The application is deployed on Vercel. Each push to the main branch triggers an automatic deployment.

## Built With

- [Next.js](https://nextjs.org/)
- [Wagmi](https://wagmi.sh/)
- [Privy](https://privy.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
