import {
  JsonFeed,
  JsonFeedItem,
} from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";
import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";
import "https://deno.land/x/dotenv/load.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import {
  getDeltas,
  getNewItems,
  getOldItems,
  saveJsonFeed,
  sendText,
} from "./src/mod.ts";

config({ safe: true });
const fromNumber: string | undefined = Deno.env.get("FROM_NUMBER");
const toNumber: string | undefined = Deno.env.get("TO_NUMBER");
const accountSid: string | undefined = Deno.env.get("TWILIO_ACCOUNT_SID");
const authToken: string | undefined = Deno.env.get("TWILIO_AUTH_TOKEN");
const itemStore: Store<JsonFeed> = Store.open<JsonFeed>({
  name: "items",
  default: {
    title: "default",
    items: [],
  },
});

let oldJsonFeed: JsonFeed = await getOldItems(itemStore);
let newJsonFeed: JsonFeed = await getNewItems();
let newItems: JsonFeedItem[] = await getDeltas(oldJsonFeed, newJsonFeed);

if (
  !!accountSid &&
  !!authToken &&
  !!newItems.length &&
  !!fromNumber &&
  !!toNumber
) {
  let response = await sendText(
    accountSid,
    authToken,
    newItems,
    fromNumber,
    toNumber
  );
  console.log(`Message sent.\n Response:\n${response}\nUpdating Data...`);
  saveJsonFeed(newJsonFeed, itemStore);
}
