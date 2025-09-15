import stripe from '@/lib/stripe';
import { ConvexHttpClient } from 'convex/browser';
import Stripe from 'stripe';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: Request) {
  const buf = Buffer.from(await req.arrayBuffer());
  const signature = req.headers.get('Stripe-Signature') as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return new Response('Webhook signature verification failed.', {
      status: 400,
    });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        await handleSubscriptionUpserted(
          event.data.object as Stripe.Subscription,
          event.type,
        );
        break;
      case 'customer.subscription.deleted':
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      default:
        break;
    }
  } catch {
    return new Response('Error processing webhook', { status: 400 });
  }

  return new Response(null, { status: 200 });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session,
) {
  const courseId = session.metadata?.courseId;
  const stripeCustomerId = session.customer as string;

  if (!courseId || !stripeCustomerId) {
    throw new Error('Missing course ID or customer ID');
  }

  const user = await convex.query(api.users.getUserByStripeCustomerId, {
    stripeCustomerId,
  });

  if (!user) {
    throw new Error('User not found');
  }

  await convex.mutation(api.purchases.recordPurchase, {
    userId: user._id,
    courseId: courseId as Id<'courses'>,
    amount: session.amount_total as number,
    stripePurchaseId: session.id,
  });
  // todo: send a success email to the user
}

async function handleSubscriptionUpserted(
  subscription: Stripe.Subscription,
  eventType: string,
) {
  if (subscription.status !== 'active' || !subscription.latest_invoice) {
    console.log(
      `Skipping subscription ${subscription.id} - Status: ${subscription.status}`,
    );
    return;
  }

  const stripeCustomerId = subscription.customer as string;
  const user = await convex.query(api.users.getUserByStripeCustomerId, {
    stripeCustomerId,
  });

  if (!user) {
    throw new Error(
      `User not found for stripe customer id ${stripeCustomerId}`,
    );
  }

  try {
    await convex.mutation(api.subscriptions.upsertSubscription, {
      userId: user._id,
      stripeSubscriptionId: subscription.id,
      status: subscription.status,
      planType: subscription.items.data[0].plan.interval as 'month' | 'year',
      currentPeriodStart: subscription.start_date,
      currentPeriodEnd:
        subscription.start_date +
        (subscription.items.data[0].plan.interval === 'month' ? 30 : 365),
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
    });
    console.log(
      `Successfully processed ${eventType} for subscription ${subscription.id}`,
    );

    // todo: send a success email to the user
  } catch (error) {
    console.error(
      `Error processing ${eventType} for subscription ${subscription.id}`,
      error,
    );
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  try {
    await convex.mutation(api.subscriptions.removeSubscription, {
      stripeSubscriptionId: subscription.id,
    });
  } catch (error) {
    console.error(`Error deleting subscription ${subscription.id}`, error);
  }
}
