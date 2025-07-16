import { Ratelimit } from '@upstash/ratelimit';
import redis from './redis';

const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '1 m'),
});

export default rateLimit;