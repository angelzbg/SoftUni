import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import CommentCardInfo from './CommentCardInfo';
import no_profile from '../../../images/no_profile.png';
import { ArrowDownIcon, ArrowUpIcon } from '@primer/octicons-react';
import Moment from 'react-moment';

export default observer(({ item }) => {
  const { _id, infoUser, userId: author, accountId: commented, content, created } = item;
  const { isFriend, requestTo, requestFrom, likes, dislikes, currentUserId } = item;
  const avatar = infoUser.avatar ? `/avatars/${infoUser.avatar}` : no_profile;
  const liked = likes.includes(currentUserId);
  const disliked = dislikes.includes(currentUserId);
  return (
    <div className="activity-comment-wrap" key={`a-c-${_id}`}>
      <Link to={`/profile/${infoUser._id}`}>
        <img className="activity-comment-avatar" src={avatar} alt="avatar" />
        <CommentCardInfo {...{ isFriend, requestTo, requestFrom }} />
      </Link>
      <div className="activity-comment-info">
        <div className="title">
          <Link to={`/profile/${author._id}`}>
            <b>{author.name}</b>
          </Link>{' '}
          commented on{' '}
          <Link to={`/profile/${commented._id}`}>
            <b>{commented.name}</b>
          </Link>
          's profile.
        </div>
        <div className="content">{content}</div>
        <div className="ratio">
          <div className={`likes ${liked ? 'liked' : ''}`}>
            <ArrowUpIcon />
            {likes.length}
          </div>
          <div className={`dislikes ${disliked ? 'disliked' : ''}`}>
            <ArrowDownIcon />
            {dislikes.length}
          </div>{' '}
          ‧ <Moment date={created} interval={60000} fromNow />
        </div>
      </div>
    </div>
  );
});
