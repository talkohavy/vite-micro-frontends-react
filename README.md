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

Now, in your IDE, open file `booksMF/src/components/App/App.tsx`,  
and change the text of the `h1` from "Vite + React" to whatever, and see that the **HMR doesn't work!**.
