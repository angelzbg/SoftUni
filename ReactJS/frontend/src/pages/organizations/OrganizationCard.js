import { observer } from 'mobx-react';
import { StarFillIcon, StarIcon, LocationIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';
import no_profile from '../../images/no_profile.png';
import CardInfo from './CardInfo';
import Moment from 'react-moment';

export default observer(({ item, i }) => {
  const { _id, name, avatar, rating, votes, ratingRound, created, city, requestFrom, requestTo, isFriend } = item;
  return (
    <Link to={`/profile/${_id}`} className="user-card" style={{ marginLeft: i % 4 !== 0 ? 8 : 0 }}>
      <img className="avatar" src={avatar ? `/avatars/${avatar}` : no_profile} alt={`${name}'s avatar`} />
      <CardInfo {...{ requestFrom, requestTo, isFriend }} />
      <div className="name">{name}</div>
      <div className="rating-wrap">
        <div className="rating">
          {rating.toFixed(2)} / {votes} votes
        </div>
        {[0, 0, 0, 0, 0].map((_, idx) => (
          <span key={`star-o-${idx}`}>{(idx < ratingRound ? StarFillIcon : StarIcon)({ size: 'small' })}</span>
        ))}
      </div>
      <div className="location">
        <LocationIcon size="small" /> {city}
      </div>
      <div className="date">
        joined <Moment date={created} interval={60000} fromNow />
      </div>
    </Link>
  );
});
