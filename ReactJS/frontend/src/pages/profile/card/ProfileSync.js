import { observer } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';

export default observer(({ syncing, sync, isSelf, id }) => (
  <div className={`profile-card-refresh-icon ${syncing ? 'syncing' : ''}`} onClick={() => sync(!isSelf ? id : false)}>
    <SyncIcon size="small" />
  </div>
));
