import './styles/search.css';
import { observer, useLocalObservable } from 'mobx-react';
import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { useStore } from '../../store/store';
import SearchLoader from '../../components/loaders/SearchLoader';
import SearchBar from './SearchBar';
import UserCard from './UserCard';
import Pagination from './Pagination';
import { runInAction } from 'mobx';

export default observer(() => {
  const history = useHistory();
  const params = new URLSearchParams(history.location.search);
  const [type, name, city] = [params.get('type'), params.get('name'), params.get('city')];
  const { searchStore } = useStore();

  const observable = useLocalObservable(() => ({
    typeVal: ['Developer', 'Organization'].includes(type) ? type : '',
    nameVal: name || '',
    cityVal: city || '',
    valueChange: ({ target: { name, value } }) => (observable[name] = value),
  }));

  useEffect(() => {
    if (['Developer', 'Organization'].includes(type) && (name || city) && !searchStore.loading && !searchStore.saved) {
      searchStore.getResults(false, type, name, city);
    } else if (searchStore.lastSearch && !type && !name && !city) {
      const { type, name, city } = searchStore.lastSearch;
      history.push(`/search?type=${type}&name=${encodeURIComponent(name)}&city=${encodeURIComponent(city)}`);
      runInAction(() => Object.assign(observable, { typeVal: type, nameVal: name || '', cityVal: city || '' }));
    }

    return () => {
      searchStore.setNoResults();
    };
  }, [searchStore, observable, type, name, city, history]);

  useEffect(() => (document.title = 'Search - Webby'), []);

  const { typeVal, nameVal, cityVal, valueChange } = observable;
  const isValid = !!observable.typeVal && (!!observable.nameVal || !!observable.cityVal);

  return (
    <>
      <SearchBar {...{ searchStore, nameVal, typeVal, cityVal, isValid, valueChange, history }} />
      {searchStore.loading ? (
        <SearchLoader />
      ) : searchStore.noresults ? (
        <div className="search-no-results">No results found</div>
      ) : (
        <>
          {searchStore.items.map((item, i) => (
            <UserCard key={`u-s-c-${item._id}`} {...{ item, i }} />
          ))}
          <Pagination {...{ type, name, city }} />
        </>
      )}
    </>
  );
});
