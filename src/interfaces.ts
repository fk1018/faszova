import { JsonFeed, JsonFeedItem } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";

export interface IDiscJsonFeedItem extends JsonFeedItem {
} 

export interface IDiscJsonFeed extends JsonFeed {
  items: IDiscJsonFeedItem[]
}