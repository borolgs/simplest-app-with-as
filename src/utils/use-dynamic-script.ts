import { useEffect, useState } from 'react';

const urlCache = new Set();

export const useDynamicScript = (url: string) => {
  const [isRemoteReady, setIsRemoteReady] = useState(false);
  const [isRemoteFailed, setIsRemoteFailed] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');

    (async function () {
      setIsRemoteReady(false);
      setIsRemoteFailed(false);

      if (urlCache.has(url)) {
        setIsRemoteReady(true);
        setIsRemoteFailed(false);

        return;
      }

      try {
        let serviceName = url.trim().split('/').reverse()[1];
        const res = await fetch('/zalfa/hr/asr/zsrv_app_hash?services=' + serviceName);
        if (!res.ok) {
          setIsRemoteReady(false);
          setIsRemoteFailed(true);
        }
        const { hash } = await res.json();

        url = url.replace(serviceName, `${hash}/${serviceName}`);
      } catch (error) {
        setIsRemoteReady(false);
        setIsRemoteFailed(true);
      }

      // TEMP!
      console.log(url);
      script.src = 'http://localhost:8081/remoteEntry.js';
      //   script.src = url.replace(serviceName);
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        urlCache.add(url);
        setIsRemoteReady(true);
        setIsRemoteFailed(false);
      };

      script.onerror = (err) => {
        setIsRemoteReady(false);
        setIsRemoteFailed(true);
      };

      document.head.appendChild(script);
    })();

    return () => {
      document.head.removeChild(script);
    };
  }, [url]);

  return {
    isRemoteReady,
    isRemoteFailed,
  };
};
