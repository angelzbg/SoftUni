import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import { SyncIcon } from '@primer/octicons-react';

export default observer(() => {
  const { syncing, canSync, getData, filter } = useStore().developers;
  return (
    <div
      className={`sync-wrap ${syncing ? 'syncing' : ''}`}
      onClick={() =>
        canSync
          ? getData(0, 12 /*len*/, ...(['top', 'top-local'].includes(filter) ? [true, false] : [false, true]))
          : null
      }
    >
      <SyncIcon size="small" />
    </div>
  );
});
