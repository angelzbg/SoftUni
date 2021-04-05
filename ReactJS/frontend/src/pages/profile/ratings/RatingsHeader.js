import { observer, useLocalObservable } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import { ratingFilters, ratingIcons } from '../constants';

export default observer(({ id, filter, setFilter, syncing, sync }) => {
  const observable = useLocalObservable(() => ({
    filterPop: false,
    toggleFilter: (open) => (observable.filterPop = open ?? !observable.filterPop),
  }));

  const { filterPop, toggleFilter } = observable;

  return (
    <div className="rating-filter-profile">
      <div className="header-hr" />
      <div className="rating-filter" onMouseEnter={() => toggleFilter()} onMouseLeave={() => toggleFilter()}>
        <div className={`filter-name ${filterPop ? 'open' : ''}`}>
          <div className="name">{filter}</div> {ratingIcons[filter]}
        </div>
        {filterPop && !syncing && (
          <div className="filter-popup-wrap">
            {Object.values(ratingFilters)
              .filter((r) => r !== filter)
              .map((f) => (
                <div
                  className="filter-popup"
                  key={`rating-filter-${f}`}
                  onClick={() => {
                    setFilter(f);
                    toggleFilter(false);
                  }}
                >
                  <div className="name">{f}</div> {ratingIcons[f]}
                </div>
              ))}
          </div>
        )}
      </div>
      <div className={`refresh-icon ${syncing ? 'syncing' : ''}`} onClick={() => sync(id)}>
        <SyncIcon size="small" />
      </div>
    </div>
  );
});
