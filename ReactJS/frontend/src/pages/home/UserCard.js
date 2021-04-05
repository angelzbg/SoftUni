import no_profile from '../../images/no_profile.png';
import { Link } from 'react-router-dom';
import { StarFillIcon, StarIcon, LocationIcon } from '@primer/octicons-react';
import CardInfo from './CardInfo';
import Moment from 'react-moment';
import { observer } from 'mobx-react';

export default observer(({ item }) => {
  const { _id, name, avatar, rating, votes, ratingRound, created, city, requestFrom, requestTo, isFriend } = item;
  return (
    <Link to={`/profile/${_id}`} className="user-card">
      <img className="avatar" src={avatar ? `/avatars/${avatar}` : no_profile} alt={`${name}'s avatar`} />
      <CardInfo {...{ requestFrom, requestTo, isFriend }} />
      <div className="name">{name}</div>
      <div className="rating-wrap">
        <div className="rating">
          {rating.toFixed(2)} / {votes} votes
        </div>
        {[0, 0, 0, 0, 0].map((_, i) => (
          <span key={`star-c-${i}`}>{(i < ratingRound ? StarFillIcon : StarIcon)({ size: 'small' })}</span>
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
