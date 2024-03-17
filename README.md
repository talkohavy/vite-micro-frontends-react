# React - Vite Federation Demo

This example demos consumption of federated modules from a vite bundle. `host` (react based) depends on a component exposed by `remote` app (react based).

## Installation

Install `pnpm` as per instructions provided [here](https://pnpm.io/installation)

Run the install command on the entire project:

```bash
pnpm install
```

## Getting Started

To run the app simply execute the following script:

```bash
pnpm run dev
```

You should now see 2 terminals that have been opened, one is running `host` on port 3000, and the other is running `mf-home` on port 3001.

- HOST: [localhost:3000](http://localhost:3000/)
- REMOTE: [localhost:3001](http://localhost:3001/)

To stop the app simply hit `CTRL + C` on each of the open terminals, or simply run `pnpm stop` to stop all micro-frontends at once.
