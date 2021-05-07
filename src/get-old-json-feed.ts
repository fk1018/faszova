import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";
import { JsonFeed } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";

export const getOldItems = async (
  itemStore: Store<JsonFeed>
): Promise<JsonFeed> => {
  const items: JsonFeed = itemStore.get();
  return Promise.resolve(items);
};
