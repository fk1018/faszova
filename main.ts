import { IDiscJsonFeed, IDiscJsonFeedItem } from "./src/interfaces.ts";
import { getDeltas, getNewItems, getOldItems } from "./src/mod.ts";
import { sendText } from "./src/send-text.ts";
import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { saveJsonFeed } from "./src/save-json-feed.ts";

config({ safe: true });
const fromNumber: string | undefined = Deno.env.get("FROM_NUMBER");
const toNumber: string | undefined = Deno.env.get("TO_NUMBER");
const accountSid: string | undefined = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken: string | undefined = Deno.env.get("TWILIO_AUTH_TOKEN");
const itemStore: Store<IDiscJsonFeed> = Store.open<IDiscJsonFeed>({
  name: "items",
  default: {
    title: "default",
    items: [],
  },
});

//get old items
let oldJsonFeed: IDiscJsonFeed = await getOldItems(itemStore);
//get new items
let newJsonFeed: IDiscJsonFeed = await getNewItems();
//compare old items to new items
let newItems: IDiscJsonFeedItem[] = await getDeltas(oldJsonFeed, newJsonFeed);

if (
  !!accountSid &&
  !!authToken &&
  !!newItems.length &&
  !!fromNumber &&
  !!toNumber
) {
  let response = await sendText(accountSid, authToken, newItems, fromNumber, toNumber);
  console.log(`Message sent.\n Response:\n${response}\nUpdating Data...`);
  saveJsonFeed(newJsonFeed, itemStore);
}
