import { useEffect } from 'react';
import { init } from '@module-federation/enhanced/runtime';
import { HOST_NAME } from '@src/common/constants';
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

    init({ name: HOST_NAME, remotes: [{ name: remoteName, entry: remoteEntryUrl, type }] });

    initedMicroFrontendsCache.set(mfKey, true);
  }, [remoteName, remoteEntryUrl]);
}
