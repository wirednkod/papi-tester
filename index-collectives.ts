import { Binary, createClient } from "polkadot-api";
// `dot` is the name we gave to `npx papi add -w wss://polkadot-rpc.polkadot.io dot`
// `collectives` is the name we gave to `npx papi add -w wss://polkadot-collectives-rpc.polkadot.io collectives`
import { dot, collectives, type DotQueries } from "@polkadot-api/descriptors";

import { getSmProvider } from "polkadot-api/sm-provider";
import { getFellowshipAddresses } from "./utils";

import { chainSpec } from "polkadot-api/chains/polkadot";

import { start } from "polkadot-api/smoldot";

const smoldot = start();
await smoldot.addChain({ chainSpec });

const dotRelayChain = import("polkadot-api/chains/polkadot").then(
  ({ chainSpec }) => smoldot.addChain({ chainSpec })
);

const smoldotParaChain = Promise.all([
  dotRelayChain,
  import("polkadot-api/chains/polkadot_collectives"),
]).then(([relayChain, { chainSpec }]) =>
  smoldot.addChain({ chainSpec, potentialRelayChains: [relayChain] })
);

const polkadotClient = createClient(getSmProvider(dotRelayChain));
const collectiveClient = createClient(getSmProvider(smoldotParaChain));

// API stuff
const coll_api = collectiveClient?.getTypedApi(collectives);
const api = polkadotClient?.getTypedApi(dot);

const addresses = await getFellowshipAddresses(api, coll_api);

addresses
  .sort((a, b) => b.rank - a.rank)
  .forEach((address) => {
    console.log(address.github, " ",address.address, " ", address.rank);
  });
