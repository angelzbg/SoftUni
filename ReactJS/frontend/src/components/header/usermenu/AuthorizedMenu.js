import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { PersonIcon, NorthStarIcon, SignOutIcon } from '@primer/octicons-react';
import Themes from './Themes';
import AuthCard from './AuthCard';
import { toggles } from '../constants';
import no_profile from '../../../images/no_profile.png';
import { wrappersIds } from '../constants';
import Notifications from '../notifications';

export default observer(({ wrapperRef, toggle, setToggle, notifWrapRef }) => {
  const { user, auth } = useStore();
  return (
    <>
      <Notifications {...{ toggle, setToggle, notifWrapRef }} />
      <div
        id={wrappersIds.userMenu}
        ref={wrapperRef}
        className={`user-menu-wrapper auth ${[toggles.main, toggles.themes].includes(toggle) ? 'active' : 'inactive'}`}
      >
        <div
          className={`profile-icon ${user ? 'logged' : ''}`}
          onClick={() => {
            if (toggle === toggles.closed) {
              auth.getUserInfo(true);
            }

            setToggle(!toggle ? toggles.main : toggles.closed);
          }}
        >
          {user ? (
            <>
              <div className="user-menu-name">{user.name.split(' ').shift()}</div>
              <img
                className="user-menu-avatar"
                src={user.avatar ? `avatars/${user.avatar}` : no_profile}
                alt="avatar"
              />
            </>
          ) : (
            <PersonIcon />
          )}
        </div>
        {toggle === toggles.main && (
          <div className="user-menu-pop">
            <AuthCard {...{ setToggle }} />
            <div className="user-menu-separator" />
            <div className="user-menu-item" onClick={() => setToggle(toggles.themes)}>
              <div className="user-menu-icon">
                <NorthStarIcon />
              </div>{' '}
              <div className="user-menu-title">Change theme</div>
            </div>
            <div className="user-menu-separator" />
            <div
              className="user-menu-item"
              onClick={async () => {
                const response = await auth.signOut();
                if (response.okay) {
                  setToggle(toggles.closed);
                }
              }}
            >
              <div className="user-menu-icon">
                <SignOutIcon />
              </div>{' '}
              <div className="user-menu-title">Sign out</div>
            </div>
          </div>
        )}
        {toggle === toggles.themes && <Themes {...{ setToggle }} />}
      </div>
    </>
  );
});
