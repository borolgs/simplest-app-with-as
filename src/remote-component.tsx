import React, { Suspense } from 'react';

const remotes: Record<string, string> = { remote1: 'http://localhost:8081/remoteEntry.js' };

export const RemoteComponent: React.FC<{ remote: string }> = ({ remote }) => {
  const [isRemoteReady, setIsRemoteReady] = React.useState(false);
  const [remoteFailMsg, setRemoteFailMsg] = React.useState('');

  React.useEffect(() => {
    const script = document.createElement('script');

    const remoteContainerUrl = remotes[remote];
    if (!remoteContainerUrl) {
      setRemoteFailMsg(`Remote "${remote}" doesn't exist`);
      return;
    }

    script.src = remoteContainerUrl;
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      setIsRemoteReady(true);
    };
    script.onerror = (err) => {
      console.log({ err });
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [remote]);

  if (remoteFailMsg) {
    return <div>{remoteFailMsg}</div>;
  }

  if (isRemoteReady) {
    const Component = React.lazy(async () => {
      try {
        await __webpack_init_sharing__('default');
        const container = window[remote];
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[remote].get('./Remote');
        const Module = factory();
        return Module;
      } catch (error) {
        console.log(error);
      }
    });

    return (
      <Suspense fallback="">
        <Component />
      </Suspense>
    );
  }

  return null;
};
