import { useEffect } from 'react';
import { observer } from 'mobx-react';
import events from '../../utils/events';
import DeveloperCard from './DeveloperCard';
import Pagination from './Pagination';
import { useStore } from '../../store/store';

export default observer(() => {
  const { developers } = useStore();

  useEffect(() => {
    events.listen('scroll-bottom', 'developers-page', async (target) => {
      if (developers.canPaginate && (await developers.getData(developers.data.length, 12, false, false)).okay) {
        target.scrollTo({ top: target.scrollTop + 120, behavior: 'smooth' });
      }
    });
    return () => {
      events.unlisten('scroll-bottom', 'developers-page');
    };
  }, [developers]);

  return (
    <>
      <div className="developers-wrap">
        {developers.items.map((item, i) => (
          <DeveloperCard key={`dev-${item._id}`} {...{ item, i }} />
        ))}
      </div>
      <Pagination />
    </>
  );
});
