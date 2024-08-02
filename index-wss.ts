// `dot` is the name we gave to `npx papi add`
import { dot } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { WebSocketProvider } from "polkadot-api/ws-provider/web";

const ws = WebSocketProvider("wss://polkadot-people-rpc.polkadot.io");

// Connect to the polkadot relay chain.
const client = createClient(ws);

// With the `client`, you can get information such as subscribing to the last
// block to get the latest hash:
client.finalizedBlock$.subscribe((finalizedBlock) =>
  console.log(finalizedBlock.number, finalizedBlock.hash)
);

// To interact with the chain, you need to get the `TypedApi`, which includes
// all the types for every call in that chain:
const peopleApi = client.getTypedApi(dot);

// get the value for an account
const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(
  "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
);

console.log("accountInfo:", accountInfo);
