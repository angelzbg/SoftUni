import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { PersonIcon, NorthStarIcon, SignInIcon, GlobeIcon } from '@primer/octicons-react';
import Themes from './Themes';
import { toggles } from '../constants';
import { wrappersIds } from '../constants';

export default observer(({ wrapperRef, toggle, setToggle }) => (
  <div id={wrappersIds.userMenu} ref={wrapperRef} className={`user-menu-wrapper ${toggle ? 'active' : 'inactive'}`}>
    <div className="profile-icon" onClick={() => setToggle(!toggle ? toggles.main : toggles.closed)}>
      <PersonIcon />
    </div>
    {toggle === toggles.main && (
      <div className="user-menu-pop">
        <div className="user-menu-item" onClick={() => setToggle(toggles.themes)}>
          <div className="user-menu-icon">
            <NorthStarIcon />
          </div>{' '}
          <div className="user-menu-title">Change theme</div>
        </div>
        <div className="user-menu-separator" />
        <Link to="/login" className="user-menu-item" onClick={() => setToggle(toggles.closed)}>
          <div className="user-menu-icon">
            <SignInIcon />
          </div>{' '}
          <div className="user-menu-title">Sign in</div>
        </Link>
        <Link to="/register" className="user-menu-item" onClick={() => setToggle(toggles.closed)}>
          <div className="user-menu-icon">
            <GlobeIcon />
          </div>{' '}
          <div className="user-menu-title">Sign up</div>
        </Link>
      </div>
    )}
    {toggle === toggles.themes && <Themes {...{ setToggle }} />}
  </div>
));
