import { registerRemotes } from '@module-federation/enhanced/runtime';
import { RemoteBundleTypes } from '../common/utils/useFederatedComponent/logic/constants';

export function registerAllRemotes() {
  registerRemotes([
    { name: '@mf/dragons', entry: 'http://localhost:3002/remoteEntry.js', type: RemoteBundleTypes.Module },
    { name: 'mf_webpack', entry: 'http://localhost:3003/mf-manifest.json', type: RemoteBundleTypes.Commonjs },
    { name: 'mf_rsbuild', entry: 'http://localhost:3005/mf-manifest.json', type: RemoteBundleTypes.Commonjs },
  ]);
}
