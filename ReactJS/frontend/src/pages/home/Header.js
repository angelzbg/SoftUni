import { observer } from 'mobx-react';

export default observer(({ filters, filtersActive, setFilter }) => (
  <div className="home-filters-wrap">
    {Object.values(filters).map((filter) => (
      <div
        key={`home-f-${filter}`}
        className={`home-filter ${!filtersActive.includes(filter) ? 'inactive' : ''}`}
        onClick={() => setFilter(filter)}
      >
        {filter}
      </div>
    ))}
  </div>
));
