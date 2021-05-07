import {
  JsonFeed,
  JsonFeedItem,
} from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";

export const getDeltas = async (
  oldJsonFeed: JsonFeed,
  newJsonFeed: JsonFeed
): Promise<JsonFeedItem[]> => {
  let newItems: JsonFeedItem[] = [];

  let oldItemsHash = new Map(
    oldJsonFeed.items.map((item) => [item.url, JSON.stringify(item)])
  );

  newItems = newJsonFeed.items.filter((item: JsonFeedItem) => {
    if (!!item.url && !oldItemsHash.get(item?.url)) {
      return item;
    }
  });
  return Promise.resolve(newItems);
};
