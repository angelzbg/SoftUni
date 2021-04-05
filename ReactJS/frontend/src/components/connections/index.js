import './styles/friends.css';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import no_profile from '../../images/no_profile.png';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { CommentDiscussionIcon } from '@primer/octicons-react';

export default observer(() => {
  const { connections, activeChatIds, openActiveChat, chatHighlights } = useStore();
  return (
    <div className="friends-wrapper">
      {!!connections.length && <div className="con-title">Connections</div>}
      {connections.map(({ _id, user, lastMessage }) => {
        return (
          <div
            key={`con-${_id}`}
            className={`friends-connection ${lastMessage && chatHighlights[lastMessage.chatId] ? 'new' : ''}`}
          >
            <Link className="con-avatar" to={`/profile/${user._id}`}>
              <img src={user.avatar ? `/avatars/${user.avatar}` : no_profile} alt="avatar" />
            </Link>
            <div className="con-data">
              <div className="con-name">
                <Link to={`/profile/${user._id}`}>{user.name}</Link>
              </div>
              {lastMessage ? (
                <>
                  <div className="con-msg" onClick={() => openActiveChat(_id)}>
                    {user._id === lastMessage.sender ? '↩' : '↪'} {lastMessage.content}
                  </div>
                  <div className="con-msg-date" onClick={() => openActiveChat(_id)}>
                    <Moment date={lastMessage.created} interval={60000} fromNow />
                  </div>
                </>
              ) : (
                <div className="con-msg" onClick={() => openActiveChat(_id)}>
                  Last message...
                </div>
              )}
            </div>
            <div
              className={`con-chat ${activeChatIds.includes(_id) ? 'active' : ''}`}
              onClick={() => openActiveChat(_id)}
            >
              <CommentDiscussionIcon size="medium" />
            </div>
          </div>
        );
      })}
    </div>
  );
});
