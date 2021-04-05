import { observer } from 'mobx-react';
import Avatar from './Avatar';
import Content from './Content';
import Information from './Information';

export default observer(({ item, id: profileId, user, syncing, setDeleteId, action }) => {
  const { _id: commentId, likes, dislikes, userId: author, content, created } = item;
  return (
    <div key={`comment-${commentId}`} className="comment">
      <Avatar {...{ author }} />
      <Content {...{ user, author, content, syncing, setDeleteId, commentId }} />
      <Information {...{ user, profileId, commentId, likes, dislikes, syncing, action, created }} />
    </div>
  );
});
