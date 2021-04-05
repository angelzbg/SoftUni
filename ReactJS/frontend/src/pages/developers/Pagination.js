import { observer } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import { useStore } from '../../store/store';

export default observer(() => {
  const { canPaginate, paginating, getData, data } = useStore().developers;
  if (canPaginate) {
    return (
      <div className="paginate">
        <div className="show" onClick={() => getData(data.length, 12, false, false)}>
          Show more...
        </div>
      </div>
    );
  } else if (paginating) {
    return (
      <div className="paginating">
        <SyncIcon />
      </div>
    );
  } else {
    return <div className="paginating-info">{data.length ? '' : 'No developers found'}</div>;
  }
});
