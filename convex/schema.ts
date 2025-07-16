import { defineTable, defineSchema } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    email: v.string(),
    name: v.string(),
    clerkId: v.string(),
    stripeCustomerId: v.string(),
    currentSubscriptionId: v.optional(v.id('subscriptions')),
  })
    .index('by_clerk_id', ['clerkId'])
    .index('by_stripe_customer_id', ['stripeCustomerId']),

  courses: defineTable({
    title: v.string(),
    description: v.string(),
    imageUrl: v.string(),
    price: v.number(),
  }),

  purchases: defineTable({
    userId: v.id('users'),
    courseId: v.id('courses'),
    amount: v.number(),
    purchaseDate: v.number(), //unix timestamp
    stripePurchaseId: v.string(),
  }).index('by_user_id_and_course_id', ['userId', 'courseId']),

  subscriptions: defineTable({
    userId: v.id('users'),
    planType: v.union(v.literal('month'), v.literal('year')),
    currentPeriodStart: v.union(v.float64(), v.null()),
    currentPeriodEnd: v.union(v.float64(), v.null()),
    stripeSubscriptionId: v.string(),
    status: v.string(),
    cancelAtPeriodEnd: v.boolean(),
  }).index('by_stripeSubscriptionId', ['stripeSubscriptionId']),
});
