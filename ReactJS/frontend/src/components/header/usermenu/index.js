import './styles/user.css';
import { useEffect, useRef } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { useStore } from '../../../store/store';
import AuthorizedMenu from './AuthorizedMenu';
import UnauthorizedMenu from './UnauthorizedMenu';
import { toggles } from '../constants';
import { runInAction } from 'mobx';
import { wrappersIds } from '../constants';

const togglesCheck = {
  [wrappersIds.userMenu]: (toggle) => [toggles.main, toggles.themes].includes(toggle),
  [wrappersIds.notifMenu]: (toggle) => toggle === toggles.notifications,
};

const checkToggle = (e, ref, id, toggle) => {
  if (!ref?.current?.contains(e.target) && e.target.id !== id && togglesCheck[id](toggle)) {
    return true;
  }
};

export default observer(() => {
  const { user, profileStore } = useStore();
  const observable = useLocalObservable(() => ({
    toggle: toggles.closed,
    setToggle: (toggle) => runInAction(() => (observable.toggle = toggle)),
  }));
  const wrapperRef = useRef(null);
  const notifWrapRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const checks = [
        { id: wrappersIds.userMenu, ref: wrapperRef },
        {
          id: wrappersIds.notifMenu,
          ref: notifWrapRef,
          callback: () => profileStore.updateUserProperty('lastNotifCheck', true),
        },
      ];

      for (let check of checks) {
        if (checkToggle(e, check.ref, check.id, observable.toggle)) {
          observable.setToggle(toggles.closed);
          return check.callback?.();
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside, { capture: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, { capture: true });
    };
  }, [observable, profileStore]);

  const { toggle, setToggle } = observable;

  return user ? (
    <AuthorizedMenu {...{ wrapperRef, toggle, setToggle, notifWrapRef }} />
  ) : (
    <UnauthorizedMenu {...{ wrapperRef, toggle, setToggle }} />
  );
});
