import { IDiscJsonFeed, IDiscJsonFeedItem } from "./src/interfaces.ts";
import { getDeltas, getNewItems, getOldItems } from "./src/mod.ts";
import { sendText } from "./src/send-text.ts";
import {Store} from 'https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts';
import "https://deno.land/x/dotenv/load.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { saveJsonFeed } from "./src/save-json-feed.ts";

config({ safe: true })

const key = Deno.env.get('KEY');
const phone = Deno.env.get('PHONE');

const itemStore: Store<IDiscJsonFeed> = Store.open<IDiscJsonFeed>({
  name: 'items',
  default: {
    title: 'default',
    items: []
  }
})

//get old items
let oldJsonFeed: IDiscJsonFeed = await getOldItems(itemStore);
//get new items
let newJsonFeed: IDiscJsonFeed = await getNewItems();
//compare old items to new items
let newItems: IDiscJsonFeedItem[] = await getDeltas(oldJsonFeed, newJsonFeed);

if (!!newItems.length && !!key && !!phone ) {
  sendText(newItems,key,phone);
  saveJsonFeed(newJsonFeed,itemStore);
}