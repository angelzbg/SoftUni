import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useStore } from '../../../store/store';
import events from '../../../utils/events';
import CommentCard from './CommentCard';
import CommentsPagination from './CommentsPagination';

export default observer(() => {
  const { activityStore } = useStore();

  useEffect(() => {
    events.listen('scroll-bottom', 'activity-page', async (target) => {
      if (activityStore.filter === 'comments' && (await activityStore.getComments(true))?.okay) {
        target.scrollTo({ top: target.scrollTop + 120, behavior: 'smooth' });
      }
    });
    return () => {
      events.unlisten('scroll-bottom', 'activity-page');
    };
  }, [activityStore]);

  return (
    <>
      <div className="activity-comments-container">
        {activityStore.items.map((item) => (
          <CommentCard key={`a-c-${item._id}`} {...{ item }} />
        ))}
        <CommentsPagination />
      </div>
    </>
  );
});
