import './styles/ratings.css';
import { useEffect } from 'react';
import { useStore } from '../../../store/store';
import { observer, useLocalObservable } from 'mobx-react';
import { ratingFilters } from '../constants';
import events from '../../../utils/events';
import ProfileRatingsLoader from '../../../components/loaders/ProfileRatingsLoader';
import RatingsHeader from './RatingsHeader';
import NoRatings from './NoRatings';
import RatingsContainer from './RatingsContainer';

export default observer(({ id }) => {
  const { ratings, loadingRatings, getRatings } = useStore().profileStore;
  const observable = useLocalObservable(() => ({
    syncing: false,
    setSync: (isSync = true) => (observable.syncing = isSync),
    sync: async (id, isSync = true) => {
      observable.setSync(true);
      await getRatings(id, isSync);
      observable.setSync(false);
    },
    filter: ratingFilters.newest,
    setFilter: (filter) => (observable.filter = filter),
  }));

  useEffect(() => {
    observable.sync(id, false);
    observable.setFilter(ratingFilters.newest);
    events.listen('rated', 'profileRatings', (id) => observable.sync(id));
    return () => {
      events.unlisten('rated', 'profileRatings');
    };
  }, [id, observable]);

  const { syncing, sync, filter, setFilter } = observable;

  return (
    <div className="ratings-profile-wrapper">
      {loadingRatings ? (
        <ProfileRatingsLoader />
      ) : (
        <>
          <RatingsHeader {...{ id, filter, setFilter, syncing, sync }} />
          {!ratings.length ? <NoRatings /> : <RatingsContainer {...{ ratings, filter }} />}
          <div className="bottom-hr" />
        </>
      )}
    </div>
  );
});
