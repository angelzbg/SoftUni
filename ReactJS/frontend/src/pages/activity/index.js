import './styles/activity.css';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import { useEffect } from 'react';
import { Redirect, useHistory, useParams } from 'react-router';
import Filters from './Filters.js';
import ActivityLoader from '../../components/loaders/ActivityLoader';
import CommentsContainer from './comments';

export default observer(() => {
  const history = useHistory();
  const { section } = useParams();
  const store = useStore();
  const { user, activityStore } = store;
  const { items, loadingComments, filter, filters } = activityStore;
  useEffect(() => (document.title = `${filters[section] || 'Comments'} - Webby`), [filters, section]);

  useEffect(() => {
    if (!store.isLoading && user) {
      if (activityStore.isValidFilter(section)) {
        activityStore.setFilter(section);
      } else if (activityStore.filter && section !== activityStore.filter) {
        history.push(`/activity/${activityStore.filter}`);
      } else {
        history.push('/activity/comments');
      }
    }
  }, [store, user, section, activityStore, history]);

  if (!user && !store.isLoading) {
    return <Redirect to="/login" />;
  }

  return (
    <>
      <Filters {...{ section, filters }} />
      {loadingComments && filter === 'comments' && !items.length ? (
        <ActivityLoader />
      ) : filter === 'connections' ? (
        <div>{!items.length && <div className="activity-comments-paginating-info">No connections found</div>}</div>
      ) : filter === 'requests' ? (
        <div>{!items.length && <div className="activity-comments-paginating-info">No requests found</div>}</div>
      ) : (
        <CommentsContainer />
      )}
    </>
  );
});
