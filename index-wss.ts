// `dot` is the name we gave to `npx papi add`
import { people } from "@polkadot-api/descriptors";
import { createClient } from "polkadot-api";
import { getWsProvider } from "polkadot-api/ws-provider/web";

import { mapRawIdentity } from "./utils";

const ws = getWsProvider("wss://polkadot-people-rpc.polkadot.io");

// Connect to the polkadot relay chain.
const client = createClient(ws);

// To interact with the chain, you need to get the `TypedApi`, which includes
// all the types for every call in that chain:
const peopleApi = client.getTypedApi(people);

// get the value for an account
const accountInfo = await peopleApi.query.Identity.IdentityOf.getValue(
  "5GGuRUMUNZkzG1BemNyQ5ua5WovpgCJ5pJbhLJDQXs2iETEx"
);

console.log("accountInfo:", mapRawIdentity(accountInfo));
