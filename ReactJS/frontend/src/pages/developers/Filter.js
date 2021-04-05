import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import { ChevronRightIcon, ShieldXIcon } from '@primer/octicons-react';
import { Link } from 'react-router-dom';

export default observer(({ section }) => {
  const store = useStore();
  const { user, developers } = store;
  const { filters, isValidFilter } = developers;
  const [filterPop, setFilterPop] = useState(false);
  useEffect(() => (document.title = `${filters[section] || 'Organizations'} - Webby`), [filters, section]);
  return (
    <div className="developers-filter-wrapper">
      <div className="filter" onMouseEnter={() => setFilterPop(true)} onMouseLeave={() => setFilterPop(false)}>
        <div className="selected">{section ? '☰ ' + filters[section] : '☰ Select section'}</div>
        {filterPop && (
          <div className="filters-wrap">
            {Object.entries(filters)
              .filter(([f]) => f !== section)
              .map(([f, n]) => {
                const isValid = isValidFilter(f, !!user);
                return (
                  <Link
                    to={isValid ? `/developers/${f}` : '/login'}
                    key={`f-o-${f}`}
                    className={`filter-option ${!isValid ? 'invalid' : ''}`}
                    onClick={() => setFilterPop(false)}
                  >
                    {isValid ? <ChevronRightIcon /> : <ShieldXIcon />}
                    {n}
                  </Link>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
});
