import './styles/notifications.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import events from '../../utils/events';
import { SyncIcon } from '@primer/octicons-react';
import { useNotificationsManager } from './constants';

export default observer(() => {
  const manager = useNotificationsManager();

  useEffect(() => {
    events.listen('notify', 'notifications', manager.add);
    return () => {
      events.unlisten('notify', 'notifications');
    };
  }, [manager]);

  return (
    <div className="notifications-container">
      {manager.notifications.map(({ id, type, msg, icon }) => (
        <div key={id} className={`notification-wrapper ${type}`}>
          <div className="notification-icon-wrap">
            <SyncIcon size="medium" className="notification-icon-sync" />
            {icon({ size: 'medium', className: 'notifications-icon' })}
          </div>
          <div className="notification-message">{msg}</div>
          <div className="notification-dismiss" onClick={() => manager.remove(id)}>
            DISMISS
          </div>
          <div className="notification-loader-outer">
            <div className="notification-loader-inner" />
          </div>
        </div>
      ))}
    </div>
  );
});
