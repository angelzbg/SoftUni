import { observer } from 'mobx-react';
import { StarFillIcon, StarIcon, LocationIcon } from '@primer/octicons-react';
import { iconsByType } from '../../../utils/constants';
import no_profile from '../../../images/no_profile.png';
import { Link } from 'react-router-dom';

export default observer(({ user, toggleProfile }) => (
  <div className="profile-pop-wrap">
    <div className="profile-pop">
      <img className="p-avatar" src={user.avatar ? `/avatars/${user.avatar}` : no_profile} alt="by avatar" />
      <div className="info">
        <Link to={`/profile/${user._id}`} onClick={() => toggleProfile()} className="name">
          {user.name}
          {iconsByType[user.type]({ size: 'small', className: 'type' })}
        </Link>
        <div className="location">
          <LocationIcon size="small" />
          {user.city}
        </div>
        <div className={`p-stars ${user.votes > 0 ? 'voted' : ''}`}>
          {new Array(5).fill(0).map((_, i) => (
            <span key={`star-p-${user._id}-${i}`}>
              {(i < user.ratingRound ? StarFillIcon : StarIcon)({ size: 'small' })}
            </span>
          ))}
        </div>
      </div>
    </div>
    <div className="arrow">
      <div />
    </div>
  </div>
));
