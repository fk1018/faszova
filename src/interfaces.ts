import { JsonFeed, JsonFeedItem } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";

export interface IDiscJsonFeedItem extends JsonFeedItem {
  link?:string;
} 

export interface IDiscJsonFeed extends JsonFeed {
  items: JsonFeedItem[]
}