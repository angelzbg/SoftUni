import { observer } from 'mobx-react';
import { runInAction } from 'mobx';
import { SearchIcon } from '@primer/octicons-react';

export default observer(({ searchStore, nameVal, typeVal, cityVal, isValid, valueChange: change, history }) => (
  <div className="search-box-wrapper">
    <input autoFocus className="search-input" value={nameVal} onChange={change} placeholder="Name..." name="nameVal" />
    <input className="search-input" value={cityVal} onChange={change} placeholder="Location..." name="cityVal" />
    <select value={typeVal} className="search-type" name="typeVal" onChange={change}>
      <option value="" disabled hidden>
        Search for...
      </option>
      {[
        { value: 'Developer', name: 'Developers' },
        { value: 'Organization', name: 'Organizations' },
      ].map(({ value, name }) => (
        <option key={`s-o-${value}`} value={value}>
          {name}
        </option>
      ))}
    </select>
    <div
      className={`search-enter ${!isValid ? 'invalid' : ''}`}
      onClick={() => {
        if (isValid) {
          runInAction(() => (searchStore.saved = false));
          const [name, city] = [encodeURIComponent(nameVal), encodeURIComponent(cityVal)];
          history.push(`/search?type=${typeVal}&name=${name}&city=${city}`);
        }
      }}
    >
      <SearchIcon />
    </div>
  </div>
));
