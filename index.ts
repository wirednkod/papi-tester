// `dot` is the name we gave to `npx papi add`
import { dot } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/node";

const ws = getWsProvider("wss://dot-rpc.stakeworld.io");

const client = createClient(ws);

client.finalizedBlock$.subscribe((finalizedBlock) =>
  console.log(finalizedBlock.number, finalizedBlock.hash)
);

// To interact with the chain, you need to get the `TypedApi`, which includes
// all the types for every call in that chain:
const dotApi = client.getTypedApi(dot);

// get the value for an account
const accountInfo = await dotApi.query.System.Account.getValue(
  "16JGzEsi8gcySKjpmxHVrkLTHdFHodRepEz8n244gNZpr9J"
);

console.log("accountInfo:", accountInfo);
