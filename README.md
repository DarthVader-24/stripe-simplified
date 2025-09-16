# MasterClass - E-Learning Platform with Stripe Integration

A modern, full-stack e-learning platform built with Next.js 14, featuring course management, user authentication, subscription plans, and Stripe payment processing. This project was built following the [Codesistency YouTube tutorial](https://www.youtube.com/watch?v=_YCC9Osq6y4&ab_channel=Codesistency).

## 🚀 Features

- **Course Management**: Browse and purchase individual courses
- **Subscription Plans**: Monthly and yearly Pro plans with Stripe integration
- **User Authentication**: Secure authentication with Clerk
- **Payment Processing**: Complete Stripe integration for one-time purchases and subscriptions
- **Email Notifications**: Automated email system with React Email
- **Real-time Database**: Convex for real-time data synchronization
- **Modern UI**: Beautiful, responsive design with Tailwind CSS and shadcn/ui
- **Rate Limiting**: Built-in protection against abuse
- **Webhook Handling**: Secure Stripe webhook processing

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **Database**: Convex (real-time database)
- **Payments**: Stripe
- **Email**: React Email with Resend
- **Rate Limiting**: Upstash Redis
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes (webhooks, billing portal)
│   │   ├── billing/           # Billing management page
│   │   ├── courses/           # Course pages and success pages
│   │   └── pro/               # Pro subscription plans
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── providers/        # Context providers
│   ├── constants/            # App constants and configuration
│   ├── emails/               # React Email templates
│   └── lib/                  # Utility functions and configurations
├── convex/                   # Convex database functions and schema
└── public/                   # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Convex account
- Clerk account
- Stripe account
- Resend account (for emails)
- Upstash Redis account (for rate limiting)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd stripe-simplified
   ```

2. **Install dependencies**

   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with the following variables:

   ```env
   # Convex
   NEXT_PUBLIC_CONVEX_URL=your_convex_url
   CONVEX_DEPLOY_KEY=your_convex_deploy_key

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Stripe
   STRIPE_SECRET_KEY=your_stripe_secret_key
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

   # Resend (Email)
   RESEND_API_KEY=your_resend_api_key

   # Upstash Redis (Rate Limiting)
   UPSTASH_REDIS_REST_URL=your_redis_url
   UPSTASH_REDIS_REST_TOKEN=your_redis_token
   ```

4. **Set up Convex**

   ```bash
   bunx convex dev
   # or
   npx convex dev
   ```

5. **Run the development server**

   ```bash
   bun dev
   # or
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Course Management

The platform includes a complete course management system:

- **Course Display**: Beautiful course cards with images and pricing
- **Individual Course Pages**: Detailed course information
- **Purchase Flow**: Secure Stripe checkout for individual courses
- **Access Control**: Users can only access purchased courses

## 💳 Subscription System

### Pro Plans

- **Monthly Plan**: $19/month

  - Unlimited access to PRO courses
  - Interactive coding environments
  - Exclusive Discord community
  - Monthly live Q&A sessions

- **Yearly Plan**: $190/year (17% savings)
  - All Monthly Pro benefits
  - Priority support
  - Exclusive yearly member events

### Features

- **Stripe Integration**: Secure payment processing
- **Subscription Management**: Users can manage their subscriptions
- **Billing Portal**: Stripe-hosted billing management
- **Webhook Handling**: Real-time subscription updates

## 📧 Email System

Automated email notifications using React Email:

- **Welcome Emails**: New user onboarding
- **Purchase Confirmations**: Course purchase receipts
- **Pro Plan Activation**: Subscription confirmation emails

## 🔒 Security Features

- **Rate Limiting**: Prevents abuse with Redis-based rate limiting
- **Webhook Verification**: Secure Stripe webhook signature verification
- **Authentication**: Secure user authentication with Clerk
- **Access Control**: Proper authorization for course access

## 🚀 Deployment

### Vercel Deployment

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Required Environment Variables for Production

Make sure to set all the environment variables listed in the installation section in your Vercel dashboard.

## 🛠️ Development

### Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun start` - Start production server
- `bun lint` - Run ESLint
- `bun email:dev` - Start email development server

### Database Functions

The project uses Convex for database operations. Key functions include:

- **Courses**: Course management and retrieval
- **Users**: User management and authentication
- **Purchases**: Course purchase tracking
- **Subscriptions**: Subscription management
- **Stripe**: Payment processing integration

## 📖 Tutorial Reference

This project was built following the comprehensive tutorial by [Codesistency](https://www.youtube.com/watch?v=_YCC9Osq6y4&ab_channel=Codesistency), which covers:

- Next.js 14 App Router setup
- Convex database integration
- Clerk authentication
- Stripe payment processing
- Email system implementation
- Rate limiting and security
- Deployment strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Codesistency](https://www.youtube.com/@Codesistency) for the excellent tutorial
- [Vercel](https://vercel.com) for the deployment platform
- [Convex](https://convex.dev) for the real-time database
- [Clerk](https://clerk.com) for authentication
- [Stripe](https://stripe.com) for payment processing
