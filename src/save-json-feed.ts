import { IDiscJsonFeed } from "./interfaces.ts";
import { Store } from "https://raw.githubusercontent.com/felixblaschke/storeosaurus/2.0.0/mod.ts";

export const saveJsonFeed = async (
  njf: IDiscJsonFeed,
  itemStore: Store<IDiscJsonFeed>
): Promise<void> => {
  itemStore.set(njf);
  Promise.resolve();
};
