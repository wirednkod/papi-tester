Some common commads:


// Download Scale for polkadot from RPC
```
npx papi add dot -n polkadot
```
or 
```
npx papi add -w wss://polkadot-rpc.polkadot.io dot
```

// Download Scale for collectives from RPC
```
npx papi add -w wss://polkadot-collectives-rpc.polkadot.io collectives
```

// After install make sure to have latest metadata etc from PAPI
```
"postinstall": "papi"
```