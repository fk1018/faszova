import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";
import { IDiscJsonFeed } from "./interfaces.ts";

export const getOldItems = async (itemStore:Store<IDiscJsonFeed>):Promise<IDiscJsonFeed> => {
  const items : IDiscJsonFeed = itemStore.get();
  return Promise.resolve(items);
}