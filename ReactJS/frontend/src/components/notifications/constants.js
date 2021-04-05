import { InfoIcon, IssueOpenedIcon } from '@primer/octicons-react';
import { useLocalObservable } from 'mobx-react-lite';
import { networkCodes } from '../../utils/constants';

const useNotificationsManager = () => {
  const getId = () => Date.now().toString(36) + Math.random().toString(36).substring(2);

  const icons = {
    error: IssueOpenedIcon,
    okay: InfoIcon,
  };

  const manager = useLocalObservable(() => ({
    notifications: [],
    add: (entry) => {
      const readable = Object.entries(entry).shift();
      const notification = {
        id: getId(),
        type: readable[0],
        msg: networkCodes[readable[1]] ?? readable[1],
        icon: icons[readable[0]],
      };
      manager.notifications.unshift(notification);
      setTimeout(() => {
        manager.remove(notification.id);
      }, 5000);
      console.log(`%c${notification.msg}`, `color: ${notification.type === 'error' ? '#e60000' : '#005ce6'}`);
    },
    remove: (removeId) => {
      const foundIndex = manager.notifications.findIndex(({ id }) => id === removeId);
      if (foundIndex !== -1) {
        manager.notifications.splice(foundIndex, 1);
      }
    },
  }));

  return manager;
};

export { useNotificationsManager };
