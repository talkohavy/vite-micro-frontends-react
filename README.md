# React - Vite Federation Demo

This example demos consumption of federated modules from a vite bundle. `host` (react based) depends on a component exposed by `remote` app (react based).

## Running

Install `pnpm` as per instructions provided [here](https://pnpm.io/installation)

Run `pnpm install`, then `pnpm run dev` under each app under `apps` folder. This will build and serve both remotes, and run the `host` in development mode.

- HOST: [localhost:3000](http://localhost:3000/)
- REMOTE-BOOKS: [localhost:3001](http://localhost:3001/)
- REMOTE-DRAGONS: [localhost:3002](http://localhost:3002/)
