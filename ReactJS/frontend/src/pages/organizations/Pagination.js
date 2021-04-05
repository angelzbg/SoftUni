import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import { SyncIcon } from '@primer/octicons-react';

export default observer(() => {
  const { canPaginate, paginating, getData, data } = useStore().organizations;
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
    return <div className="paginating-info">{data.length ? '' : 'No organizations found'}</div>;
  }
});
