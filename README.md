# Federation Demo - HMR

## HMR works with Rsbuild

Navigate to `apps/booksMF`, and run:

```bash
pnpm install
pnpm rsdev
```

Then, navigate to `apps/host`, and run:

```bash
pnpm install
pnpm rsdev
```

Now, in your IDE, open file `booksMF/src/components/App/App.tsx`,  
and change the text of the `h1` from "Vite + React" to whatever, and see that the **HMR worked properly**.

---

## HMR doesn't works with Vite

First, stop the rsbuild of both `host` and `books` servers (if currently running).

Navigate to `apps/booksMF`, and run:

```bash
pnpm dev
```

Then, navigate to `apps/host`, and run:

```bash
pnpm dev
```

**There's an infinite loop!**

Different Setting:

Open up the `vite.config.ts` of booksMF, and replace `manifest: true,` (line 15) with `filename: 'remoteEntry.js',` (line 15). Uncomment one and comment out the other. Now, in `vite.config.ts` of host, change `entry: 'http://localhost:3001/mf-manifest.json',` to `entry: 'http://localhost:3001/remoteEntry.js',`.

Try running both projects now with `pnpm dev`, you'll succeed! But if you'l open up the file `booksMF/src/components/App/App.tsx`, and change something in it, you'll see that the **HMR doesn't work!**.
