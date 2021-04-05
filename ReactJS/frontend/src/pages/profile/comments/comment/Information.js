import { observer } from 'mobx-react';
import { ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react';
import Moment from 'react-moment';

export default observer(({ user, profileId, commentId, likes, dislikes, syncing, action, created }) => {
  const liked = !!user && likes.indexOf(user._id) !== -1;
  const disliked = !!user && dislikes.indexOf(user._id) !== -1;
  return (
    <div className="comment-status">
      <div className="ratio">
        <div
          className={`likes ${liked ? 'active' : ''}`}
          onClick={() => (!syncing && !liked ? action(user, 'like', profileId, commentId) : null)}
        >
          <ArrowUpIcon size="small" /> {likes.length}
        </div>{' '}
        <div
          className={`dislikes ${disliked ? 'active' : ''}`}
          onClick={() => (!syncing && !disliked ? action(user, 'dislike', profileId, commentId) : null)}
        >
          <ArrowDownIcon size="small" /> {dislikes.length}
        </div>
      </div>{' '}
      ‧ <Moment date={created} interval={60000} fromNow />
    </div>
  );
});
