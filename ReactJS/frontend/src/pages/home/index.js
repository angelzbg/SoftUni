import './styles/home.css';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { useStore } from '../../store/store';
import PageLoader from '../../components/loaders/PageLoader';
import HorizontalContainer from './HorizontalContainer';
import Header from './Header';
import { getContainers } from './constants';

export default observer(() => {
  const store = useStore();
  const { user, home } = store;
  const { loading, getData, filters, filtersActive, setFilter } = home;

  useEffect(() => (!store.isLoading ? getData() : null), [store, user, getData]);
  useEffect(() => (document.title = 'Home - Webby'), []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <Header {...{ filters, filtersActive, setFilter }} />
      {getContainers()
        .filter(({ filter, auth }) => filtersActive.includes(filter) && (!user ? !auth : true))
        .map((container) => (
          <HorizontalContainer key={`container-h-${container.title}`} {...container} />
        ))}
    </>
  );
});
