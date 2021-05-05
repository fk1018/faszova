import {Store} from 'https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts';
import { IDiscJsonFeed } from "./interfaces.ts";

const itemStore = Store.open<IDiscJsonFeed>({
  name: 'items',
  default: {
    title: 'default',
    items: []
  }
})

export const getOldItems = async ():Promise<IDiscJsonFeed> => {
  const items : IDiscJsonFeed = itemStore.get();
  return Promise.resolve(items);
}