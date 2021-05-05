import { IDiscJsonFeedItem } from "./interfaces.ts";

export const sendText = (newItems : IDiscJsonFeedItem[], key:string, phone:string) => {
  const message : any = newItems.map(item=>item.url).join(' \n') ;
  const body : IMsgBody = {
    phone,
    message,
    key
  }
  fetch("https://textbelt.com/text", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};

interface IMsgBody {
  phone: string;
  message:string;
  key:string;
}