import { useEffect } from 'react';
import { registerRemotes } from '@module-federation/enhanced/runtime';
import { initedMicroFrontendsCache, RemoteBundleType } from '../constants';

type UseInitMicroFrontendProps = {
  remoteName: string;
  remoteEntryUrl: string;
  /**
   * @default 'var'
   */
  type?: RemoteBundleType;
};

export default function useInitMicroFrontend(props: UseInitMicroFrontendProps) {
  const { remoteName, remoteEntryUrl, type } = props;

  useEffect(() => {
    const mfKey = `${remoteName}-${remoteEntryUrl}`;
    const wasMicroFrontendAlreadyInited = initedMicroFrontendsCache.get(mfKey);

    if (wasMicroFrontendAlreadyInited) return;

    const remotes = [{ name: remoteName, entry: remoteEntryUrl, type }];

    registerRemotes(remotes);

    initedMicroFrontendsCache.set(mfKey, true);
  }, [remoteName, remoteEntryUrl, type]);
}
