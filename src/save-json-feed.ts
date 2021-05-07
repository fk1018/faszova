import { JsonFeed } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";
import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";

export const saveJsonFeed = async (
  njf: JsonFeed,
  itemStore: Store<JsonFeed>
): Promise<void> => {
  itemStore.set(njf);
  Promise.resolve();
};
