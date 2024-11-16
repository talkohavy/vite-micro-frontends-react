import { Suspense, useState } from 'react';
import { init } from '@module-federation/runtime';
import { useFederatedComponent } from '@src/utils/useFederatedComponent';

init({
  name: 'app1',
  remotes: [
    {
      name: 'app2',
      entry: 'http://localhost:3002/assets/remoteEntry.js',
    },
    {
      name: 'app3',
      entry: 'http://localhost:5001/assets/remoteEntry.js',
    },
  ],
});

export default function DynamicPage() {
  const [system, setSystem] = useState({});
  const { module, scope, url } = system as any;

  function setApp2() {
    setSystem({
      url: 'http://localhost:3002/remoteEntry.js',
      scope: 'app2',
      module: './Widget',
    });
  }

  function setApp3() {
    setSystem({
      url: 'http://localhost:3003/remoteEntry.js',
      scope: 'app3',
      module: './Widget',
    });
  }

  const { Component: FederatedComponent, errorLoading } = useFederatedComponent({ remoteUrl: url, scope, module });

  return (
    <div
      style={{
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <h1>Dynamic System Host</h1>
      <h2>App 1</h2>
      <p>
        The Dynamic System will take advantage Module Federation <strong>remotes</strong> and <strong>exposes</strong>.
        It will no load components that have been loaded already.
      </p>
      <button type='button' onClick={setApp2}>
        Load App 2 Widget
      </button>
      <button type='button' onClick={setApp3}>
        Load App 3 Widget
      </button>
      <div style={{ marginTop: '2em' }}>
        <Suspense fallback='Loading System'>
          {errorLoading ? `Error loading module "${module}"` : FederatedComponent && <FederatedComponent />}
        </Suspense>
      </div>
    </div>
  );
}
