// `dot` is the name we gave to `npx papi add`
import { dot } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { WebSocketProvider } from "polkadot-api/ws-provider/web"

const ws = WebSocketProvider("wss://dot-rpc.stakeworld.io");

const client = createClient(ws)

client.finalizedBlock$.subscribe((finalizedBlock) =>
    console.log(finalizedBlock.number, finalizedBlock.hash)
  );

// To interact with the chain, you need to get the `TypedApi`, which includes
// all the types for every call in that chain:
const dotApi = client.getTypedApi(dot);