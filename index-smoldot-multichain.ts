import { Binary, createClient } from "polkadot-api";
// `dot` is the name we gave to `npx papi add -w wss://polkadot-rpc.polkadot.io dot`
// `collectives` is the name we gave to `npx papi add -w wss://polkadot-collectives-rpc.polkadot.io collectives`
import { dot, collectives, people } from "@polkadot-api/descriptors";

import { getSmProvider } from "polkadot-api/sm-provider";
import { getAllData } from "./utils";

import { chainSpec } from "polkadot-api/chains/polkadot";

import { start } from "polkadot-api/smoldot";

const smoldot = start();
await smoldot.addChain({ chainSpec });

const dotRelayChain = import("polkadot-api/chains/polkadot").then(
  ({ chainSpec }) => smoldot.addChain({ chainSpec })
);

const peopleParaChain = Promise.all([
  dotRelayChain,
  import("polkadot-api/chains/polkadot_people"),
]).then(([relayChain, { chainSpec }]) =>
  smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] })
);

const smoldotParaChain = Promise.all([
  dotRelayChain,
  import("polkadot-api/chains/polkadot_collectives"),
]).then(([relayChain, { chainSpec }]) =>
  smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] })
);

const peopleClient = createClient(getSmProvider(peopleParaChain));
const collectiveClient = createClient(getSmProvider(smoldotParaChain));

// API stuff
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
