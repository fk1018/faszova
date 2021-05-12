import { deserializeFeed } from "https://deno.land/x/rss/mod.ts";
import { JsonFeed } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";

export const getNewItems = async (): Promise<JsonFeed> => {
  const response = await fetch(
    "https://proshop.innovadiscs.com/rss/catalog/category/cid/22/store_id/1/"
  );
  const xml = await response.text();
  const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });
  return feed;
};
