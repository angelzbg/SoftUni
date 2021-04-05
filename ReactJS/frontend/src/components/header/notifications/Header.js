import { observer } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';

export default observer(({ loadingRequests, loadRequests }) => (
  <div className="notif-header">
    Notifications{' '}
    <div className={`notif-sync ${loadingRequests ? 'notif-syncing' : ''}`} onClick={loadRequests}>
      <SyncIcon />
    </div>
  </div>
));
