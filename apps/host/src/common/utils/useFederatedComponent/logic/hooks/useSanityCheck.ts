import { useEffect } from 'react';

type UseSanityCheckProps = {
  remoteName: string;
  moduleName: string;
  remoteEntryUrl: string;
};

export default function useSanityCheck(props: UseSanityCheckProps) {
  const { moduleName, remoteEntryUrl, remoteName } = props;

  useEffect(() => {
    if (!(remoteName && moduleName && remoteEntryUrl))
      throw new Error('remoteName, moduleName, and remoteEntryUrl must be valid values at all times!', {
        cause: { remoteName, moduleName, remoteEntryUrl },
      });
  }, [remoteName, moduleName, remoteEntryUrl]);
}
