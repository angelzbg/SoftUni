import { Fragment } from 'react';
import { observer, useLocalObservable } from 'mobx-react';
import { StarFillIcon, StarIcon } from '@primer/octicons-react';
import { ratingFilter } from '../constants';
import no_profile from '../../../images/no_profile.png';
import ProfilePop from './ProfilePop';
import Moment from 'react-moment';

export default observer(({ ratings, filter }) => {
  const observable = useLocalObservable(() => ({
    profilePop: '',
    toggleProfile: (id) => (observable.profilePop = id ?? ''),
  }));

  const { profilePop, toggleProfile } = observable;

  return (
    <div className={`ratings-wrapper ${profilePop ? 'pop' : ''}`} onScroll={() => toggleProfile()}>
      {ratings
        .slice()
        .sort(ratingFilter[filter])
        .map(({ _id, stars, created, userId: user }, i) => (
          <Fragment key={`rating-${_id}`}>
            <div className="rating" onMouseMove={() => toggleProfile(user._id)} onMouseLeave={() => toggleProfile()}>
              <div className="by">
                <img className="by-avatar" src={user.avatar ? `/avatars/${user.avatar}` : no_profile} alt="by avatar" />
                {user.name.split(' ').shift()}
              </div>
              <div className="how">
                rated{' '}
                {new Array(5).fill(0).map((_, i) => (
                  <span key={`star-p-${_id}-${i}`}>{(i < stars ? StarFillIcon : StarIcon)({ size: 'small' })}</span>
                ))}
              </div>
              <div className="when">
                <Moment date={created} interval={60000} fromNow />
              </div>
              {profilePop === user._id && <ProfilePop {...{ user, toggleProfile }} />}
            </div>
            {i !== ratings.length - 1 && <div className="border" />}
          </Fragment>
        ))}
    </div>
  );
});
