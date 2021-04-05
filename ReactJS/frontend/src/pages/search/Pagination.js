import { observer } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import { useStore } from '../../store/store';
import { useEffect } from 'react';
import events from '../../utils/events';

export default observer(() => {
  const { searchStore } = useStore();

  useEffect(() => {
    events.listen('scroll-bottom', 'search-page', async (target) => {
      if ((await searchStore.getResults(true))?.okay) {
        target.scrollTo({ top: target.scrollTop + 120, behavior: 'smooth' });
      }
    });
    return () => {
      events.unlisten('scroll-bottom', 'search-page');
    };
  }, [searchStore]);

  const { canPaginate, paginating, getResults } = searchStore;

  if (canPaginate) {
    return (
      <div className="activity-comments-paginate">
        <div className="activity-comments-show" onClick={() => getResults(true)}>
          Show more...
        </div>
      </div>
    );
  } else if (paginating) {
    return (
      <div className="activity-comments-paginating">
        <SyncIcon />
      </div>
    );
  } else {
    return null;
  }
});
