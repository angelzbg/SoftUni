import './styles/navigation.css';
import { Link, withRouter } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { getLinks } from '../constants';

export default withRouter(
  observer(({ location: { pathname } }) => {
    const { user, developers, organizations, activityStore } = useStore();
    return (
      <div className="navigation-wrapper">
        {getLinks({
          devSection: developers.filter,
          orgSection: organizations.filter,
          actSection: activityStore.filter,
        }).map(({ path, name, icon, auth }, i) => (
          <Link
            key={`nav-link-${name}`}
            to={auth && !user ? auth : path}
            className={`nav-icon-link ${
              (pathname === '/' && pathname === path) || (path !== '/' && pathname.startsWith(path))
                ? 'active'
                : 'inactive'
            }`}
          >
            {icon({ size: 'medium' })}
            <div className="tip-navigation">{name}</div>
          </Link>
        ))}
      </div>
    );
  })
);
