import { observer } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import { useStore } from '../../../store/store';

export default observer(() => {
  const { canPaginateComments, paginatingComments, getComments, comments } = useStore().activityStore;
  if (canPaginateComments) {
    return (
      <div className="activity-comments-paginate">
        <div className="activity-comments-show" onClick={() => getComments(true)}>
          Show more...
        </div>
      </div>
    );
  } else if (paginatingComments) {
    return (
      <div className="activity-comments-paginating">
        <SyncIcon />
      </div>
    );
  } else {
    return <div className="activity-comments-paginating-info">{comments.length ? '' : 'No comments found'}</div>;
  }
});
