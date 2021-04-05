import { observer } from 'mobx-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@primer/octicons-react';

export default observer(({ section, filters }) => {
  const [filterPop, setFilterPop] = useState(false);
  return (
    <div className="activity-filter-wrapper">
      <div className="activity-filter" onMouseEnter={() => setFilterPop(true)} onMouseLeave={() => setFilterPop(false)}>
        <div className="activity-selected">{section ? '☰ ' + filters[section] : '☰ Select section'}</div>
        {filterPop && (
          <div className="activity-filters-wrap">
            {Object.entries(filters)
              .filter(([f]) => f !== section)
              .map(([f, n], i) => (
                <Link
                  to={`/activity/${f}`}
                  key={`f-a-${f}`}
                  className={'activity-filter-option'}
                  onClick={() => setFilterPop(false)}
                >
                  <ChevronRightIcon />
                  {n}
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
});
