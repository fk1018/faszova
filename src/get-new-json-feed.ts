import { deserializeFeed } from 'https://deno.land/x/rss/mod.ts';
import { IDiscJsonFeed } from "./interfaces.ts";

export const getNewItems = async ():Promise<IDiscJsonFeed>=>{
  const response = await fetch('https://proshop.innovadiscs.com/rss/catalog/category/cid/22/store_id/1/');
  const xml = await response.text();
  const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });
  return Promise.resolve(feed);
}