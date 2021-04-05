import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { StarIcon, StarFillIcon } from '@primer/octicons-react';
import { toggles } from '../constants';
import no_profile from '../../../images/no_profile.png';

export default observer(({ setToggle }) => {
  const { user } = useStore();
  const { votes, rating, ratingRound } = user;
  return (
    <Link className="user-menu-item-me" to={`/profile/${user._id}`} onClick={() => setToggle(toggles.closed)}>
      <img
        className="user-menu-item-me-avatar"
        src={user.avatar ? `avatars/${user.avatar}` : no_profile}
        alt="avatar"
      />
      <div className="user-menu-item-me-info-wrapper">
        <span className="me-name">{user.name}</span>
        <span className="me-type">{user.type}</span>
        {[0, 0, 0, 0, 0].map((_, i) => {
          const isVoted = votes !== 0;
          const isFilled = isVoted && i < ratingRound;
          return (
            <span className={`me-star ${isVoted ? 'voted' : 'notvoted'}`} key={`user-menu-me-star-${i}`}>
              {(isFilled ? StarFillIcon : StarIcon)({ size: 'medium' })}
            </span>
          );
        })}
        <span className="me-star-count">/{rating.toFixed(2)}</span>
      </div>
    </Link>
  );
});
