import { observer } from 'mobx-react';
import { BellFillIcon } from '@primer/octicons-react';
import { toggles } from '../constants';

export default observer(({ toggle, setToggle, newCount, profileStore }) => (
  <div
    className={`bell ${toggle === toggles.notifications ? 'active' : ''}`}
    onClick={() => {
      if (toggle === toggles.notifications) {
        setToggle(toggles.closed);
        profileStore.updateUserProperty('lastNotifCheck', true);
      } else {
        setToggle(toggles.notifications);
      }
    }}
  >
    <BellFillIcon size="medium" />
    {toggle !== toggles.notifications && !!newCount && <div className="notif-count">{newCount}</div>}
  </div>
));
