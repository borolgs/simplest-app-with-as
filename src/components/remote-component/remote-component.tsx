import React, { FC, lazy, Suspense } from 'react';

import { Typography } from '@alfalab/core-components/typography';

import { Config, config } from '../../config';
import { loadComponent } from '../../utils/load-component';
import { useDynamicScript } from '../../utils/use-dynamic-script';

import styles from './remote-component.module.css';

interface RemoteComponentProps {
  remote: keyof Config['remotes'];
}

export const RemoteComponent: FC<RemoteComponentProps> = React.memo(({ remote }) => {
  const { remoteApp, remoteComponent, remoteComponentName, remoteEntryUrl } = config.remotes[remote];
  const { isRemoteReady, isRemoteFailed } = useDynamicScript(remoteEntryUrl);

  if (isRemoteFailed) {
    return (
      <div className={styles.errorMessage}>
        <Typography.Title className={styles.errorMessageTitle} tag="h3" view="small">
          {`При загрузке модуля «${remoteComponentName}» произошла ошибка`}
        </Typography.Title>
        <Typography.Text className={styles.errorMessageText} color="secondary" tag="p" view="primary-medium">
          Попробуйте обновить страницу или вернитесь чуть позже
        </Typography.Text>
      </div>
    );
  }

  if (isRemoteReady) {
    const Component = lazy(loadComponent(remoteApp, remoteComponent));

    return (
      <Suspense fallback="">
        <Component />
      </Suspense>
    );
  }

  return null;
});
