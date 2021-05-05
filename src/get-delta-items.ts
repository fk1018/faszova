import { IDiscJsonFeed,IDiscJsonFeedItem } from "./interfaces.ts";

export const getDeltas = async (
  oldJsonFeed: IDiscJsonFeed,
  newJsonFeed: IDiscJsonFeed
): Promise<IDiscJsonFeedItem[]> => {
  let newItems: IDiscJsonFeedItem[] = [];

  let oldItemsHash: Map<string,IDiscJsonFeedItem> = Object.fromEntries(
    oldJsonFeed.items.map((item:IDiscJsonFeedItem) => [item.link, item])
  );

  newItems = newJsonFeed.items.filter((item:IDiscJsonFeedItem) => {
    if(!!item.link && oldItemsHash.get(item.link)){
      return item;
    }
  });
  return Promise.resolve(newItems);
};
