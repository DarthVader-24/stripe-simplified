import { ConvexHttpClient } from 'convex/browser';
import {
  FunctionReference,
  OptionalRestArgs,
  DefaultFunctionArgs,
} from 'convex/server';

export async function getFromServer<T extends DefaultFunctionArgs>(
  functionReference: FunctionReference<'query', 'public', T>,
  ...args: OptionalRestArgs<typeof functionReference>
): Promise<T> {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return await convex.query(functionReference, ...args);
}
