import { Binary, createClient } from "polkadot-api";
// `dot` is the name we gave to `npx papi add -w wss://polkadot-rpc.polkadot.io dot`
// `collectives` is the name we gave to `npx papi add -w wss://polkadot-collectives-rpc.polkadot.io collectives`
import { dot, collectives, people } from "@polkadot-api/descriptors";

import { getAllData } from "./utils";
import { getWsProvider } from "polkadot-api/ws-provider/web";

const ws = getWsProvider("wss://dot-rpc.stakeworld.io");
const people_ws = getWsProvider("wss://polkadot-people-rpc.polkadot.io");
const collectives_ws = getWsProvider(
  "wss://polkadot-collectives-rpc.polkadot.io"
);

const client = createClient(ws);
const peopleClient = createClient(people_ws);
const collectiveClient = createClient(collectives_ws);

// API stuff
const api = client?.getTypedApi(dot);
const coll_api = collectiveClient?.getTypedApi(collectives);
const people_api = peopleClient?.getTypedApi(people);

const addresses = await getAllData(people_api, coll_api);

console.log("Display, Github, Address, Rank");
addresses
  .sort((a, b) => b.rank - a.rank)
  .forEach((address) => {
    console.log(
      address.display,
      ", ",
      address.github,
      ", ",
      address.address,
      ", ",
      address.rank
    );
  });
