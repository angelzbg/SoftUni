import { observer, useLocalObservable } from 'mobx-react';
import { useStore } from '../../../store/store';
import { StarIcon, StarFillIcon } from '@primer/octicons-react';
import { useHistory } from 'react-router';

export default observer(({ id, profile, isSelf, syncing, sync, setSync }) => {
  const history = useHistory();
  const { user, profileStore } = useStore();
  const { votes, rating, ratingRound } = profile;
  const [canVote, isVoted] = [!!user && user._id !== id && !!profile, votes !== 0];

  const observable = useLocalObservable(() => ({
    hoveredStar: -1,
    setHoveredStar: (number = 0) => (observable.hoveredStar = number),
    rate: async (stars = 0, isSelf, id) => {
      setSync(true);
      (await profileStore.rateUser(stars)).okay ? sync(!isSelf ? id : false) : setSync(false);
    },
  }));

  return (
    <div className="profile-card-stars">
      {[0, 0, 0, 0, 0].map((_, i) => {
        const isFilled =
          (isVoted && i < /*=*/ ratingRound && observable.hoveredStar === -1) ||
          (canVote && i <= observable.hoveredStar);
        return (
          <div
            style={!user ? { cursor: 'pointer' } : {}}
            className={`profile-card-star ${observable.hoveredStar === -1 ? (isVoted ? 'voted' : 'notvoted') : ''} ${
              canVote && observable.hoveredStar !== -1 ? 'can' : ''
            }`}
            key={`profile-card-star-${i}`}
            onMouseEnter={() => (canVote ? observable.setHoveredStar(i) : null)}
            onMouseLeave={() => observable.setHoveredStar(-1)}
            onClick={() =>
              canVote && !syncing ? observable.rate(i + 1, isSelf, id) : !user ? history.push('/login') : null
            }
          >
            {(isFilled ? StarFillIcon : StarIcon)({ size: 'medium' })}
          </div>
        );
      })}
      <div className="profile-card-rating-text">
        /{rating.toFixed(2)} | {votes} rating(s)
      </div>
    </div>
  );
});
