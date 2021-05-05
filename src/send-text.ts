import { IDiscJsonFeedItem } from "./interfaces.ts";

export const sendText = (newItems : IDiscJsonFeedItem[], key:string, phone:string) => {
  let message : any = newItems.map(item=>item.url?.substring(32,item.url.length-5).replaceAll('-',' ')).join(', ');

  if(message.length >= 70){
    message = message.substring(0,69);
  }

  const body : IMsgBody = {
    phone,
    message,
    key
  }
  console.log(`Message length is: ${message.length}`)
  console.log(`Sending Message...\nMessage: \n${message}`);
  fetch("https://textbelt.com/text", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('Msg sent.\n Response Info:\t:',data);
    });
};

interface IMsgBody {
  phone: string;
  message:string;
  key:string;
}