import { observer } from 'mobx-react';
import no_profile from '../../images/no_profile.png';
import { Link } from 'react-router-dom';
import { XIcon } from '@primer/octicons-react';

export default observer(({ chatUser, closeActiveChat, _id }) => {
  return (
    <div className="chat-header">
      <Link className="chat-header-user" to={`/profile/${chatUser._id}`} title={`To ${chatUser.name}'s profile`}>
        <div className="chat-header-avatar">
          <img src={chatUser.avatar ? `/avatars/${chatUser.avatar}` : no_profile} alt="avatar" />
        </div>
        <div className="chat-header-name">{chatUser.name}</div>
      </Link>
      <div className="chat-header-close" title="Close" onClick={() => closeActiveChat(_id)}>
        <XIcon size="small" />
      </div>
    </div>
  );
});
