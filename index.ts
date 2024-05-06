import { AccountId, createClient } from 'polkadot-api';
import { getSmProvider } from 'polkadot-api/sm-provider';
import { start } from 'polkadot-api/smoldot';
import { chainSpec } from 'polkadot-api/chains/polkadot';
import { dot } from '@polkadot-api/descriptors';
import { withLogsRecorder } from 'polkadot-api/logs-provider';

const smoldot = start();

const client = createClient(
    getSmProvider(smoldot.addChain({ chainSpec }))
);
const api = client.getTypedApi(dot);

const addresses = Array(25)
    .fill(null)
    .map(() => {
        const bytes = new Uint8Array(32);
        self.crypto.getRandomValues(bytes);
        return AccountId().dec(bytes);
    });

console.log(`querying ${addresses.length} identities`);

const results = await Promise.all(
    addresses.map((address) => api.query.Identity.IdentityOf.getValue(address))
);

console.log(results);
