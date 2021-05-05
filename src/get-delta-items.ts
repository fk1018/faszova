import { IDiscJsonFeed,IDiscJsonFeedItem } from "./interfaces.ts";

export const getDeltas = async (
  oldJsonFeed: IDiscJsonFeed,
  newJsonFeed: IDiscJsonFeed
): Promise<IDiscJsonFeedItem[]> => {
  let newItems: IDiscJsonFeedItem[] = [];

  let oldItemsHash = new Map(oldJsonFeed.items.map(item=>[item.url,JSON.stringify(item)]));

  newItems = newJsonFeed.items.filter((item:IDiscJsonFeedItem) => {
    if(!!item.url && !oldItemsHash.get(item?.url)){
      return item;
    }
  });
  return Promise.resolve(newItems);
};
