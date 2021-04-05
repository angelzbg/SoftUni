import './styles/notif.css';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { toggles } from '../constants';
import { notificationsComponents } from './constants';
import { wrappersIds } from '../constants';
import Bell from './Bell';
import Header from './Header';

export default observer(({ toggle, setToggle, notifWrapRef }) => {
  const { time, profileStore, loadingRequests, loadRequests, notifications } = useStore();
  const { list, newCount } = notifications;
  return (
    <div className="notif-wrapper" id={wrappersIds.notifMenu} ref={notifWrapRef}>
      <Bell {...{ toggle, setToggle, newCount, profileStore }} />
      {toggle === toggles.notifications && (
        <div className="notif-container-wrap">
          <div className="notif-container">
            <Header {...{ loadingRequests, loadRequests }} />
            {!!list.length ? (
              list.map((item, i) => notificationsComponents[item.type]({ item, i, setToggle, profileStore, time }))
            ) : (
              <div className="notif-empty">Nothing new to display</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
