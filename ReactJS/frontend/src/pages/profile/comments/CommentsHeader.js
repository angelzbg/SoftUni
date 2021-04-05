import { observer, useLocalObservable } from 'mobx-react';
import { SyncIcon } from '@primer/octicons-react';
import { commentsFilters, commentsIcons } from '../constants';

export default observer(({ id, filter, setFilter, syncing, sync }) => {
  const observable = useLocalObservable(() => ({
    filterPop: false,
    toggleFilter: (open) => (observable.filterPop = open ?? !observable.filterPop),
  }));
  const { filterPop, toggleFilter } = observable;
  return (
    <div className="comments-filter-profile">
      <div className="comments-filter" onMouseEnter={() => toggleFilter()} onMouseLeave={() => toggleFilter()}>
        <div className={`filter-name ${filterPop ? 'open' : ''}`}>
          <div className="name">{filter}</div> {commentsIcons[filter]}
        </div>
        {filterPop && !syncing && (
          <div className="filter-popup-wrap">
            {Object.values(commentsFilters)
              .filter((r) => r !== filter)
              .map((f) => (
                <div
                  className="filter-popup"
                  key={`comments-filter-${f}`}
                  onClick={() => {
                    setFilter(f);
                    toggleFilter(false);
                  }}
                >
                  <div className="name">{f}</div> {commentsIcons[f]}
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
