import { observer } from 'mobx-react';
import { ArrowLeftIcon } from '@primer/octicons-react';
import { toggles } from '../constants';
import { Link } from 'react-router-dom';
import no_profile from '../../../images/no_profile.png';
import Moment from 'react-moment';

export default observer(({ item, setToggle, profileStore }) => (
  <Link
    to={`/profile/${item.sender._id}`}
    className="friend-request-wrap"
    onClick={() => {
      setToggle(toggles.closed);
      profileStore.updateUserProperty('lastNotifCheck', true);
    }}
  >
    <div className="friend-request-avatar">
      <img src={item.sender.avatar ? `/avatars/${item.sender.avatar}` : no_profile} alt="avatar" />
      <div className="friend-request-icon">
        <ArrowLeftIcon size="small" />
      </div>
    </div>
    <div className="friend-request-text">
      <b>{item.sender.name}</b> wants to connect with you.
      <div className={`friend-request-date ${item.new ? 'new' : ''}`}>
        <Moment date={item.created} interval={60000} fromNow />
      </div>
    </div>
  </Link>
));
