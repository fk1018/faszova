import { JsonFeedItem } from "https://deno.land/x/rss@0.3.3/src/types/mod.ts";
import * as base64 from "https://denopkg.com/chiefbiiko/base64/mod.ts";

export const sendText = async (
  accountSid: string,
  authToken: string,
  newItems: JsonFeedItem[],
  fromNumber: string,
  toNumber: string
): Promise<any> => {
  let messageBody: string = newItems
    .map((item) =>
      item.url?.substring(32, item.url.length - 5).replaceAll("-", " ")
    )
    .join(", ");
  if (messageBody.length >= 111) {
    messageBody = messageBody.substring(0, 110);
  }

  messageBody = messageBody + "\n https://bit.ly/3toXGnL";
  const url: string = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;

  const encodedCredentials: string = base64.fromUint8Array(
    new TextEncoder().encode(`${accountSid}:${authToken}`)
  );
  const body: URLSearchParams = new URLSearchParams({
    To: toNumber,
    From: fromNumber,
    Body: messageBody,
  });

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${encodedCredentials}`,
    },
    body,
  });
  return response.json();
};
