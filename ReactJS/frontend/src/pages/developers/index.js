import './styles/developers.css';
import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useHistory, useParams } from 'react-router';
import { useStore } from '../../store/store';
import Sync from './Sync';
import Filter from './Filter';
import DevelopersLoader from '../../components/loaders/DevelopersLoader';
import DevelopersContainer from './DevelopersContainer';

export default observer(() => {
  const history = useHistory();
  const { section } = useParams();
  const store = useStore();
  const { user, developers } = store;

  useEffect(() => {
    if (!store.isLoading) {
      if (developers.isValidFilter(section, !!user)) {
        developers.setFilter(section);
      } else if (developers.filter && section !== developers.filter) {
        history.push(`/developers/${developers.filter}`);
      } else {
        history.push('/developers/new');
      }
    }
  }, [store, user, section, developers, history]);

  return (
    <>
      <Filter {...{ section }} />
      <Sync />
      {developers.loading ? <DevelopersLoader /> : <DevelopersContainer {...{ section }} />}
    </>
  );
});
