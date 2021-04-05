import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store';
import events from '../../utils/events';
import OrganizationCard from './OrganizationCard';
import Pagination from './Pagination';

export default observer(() => {
  const { organizations } = useStore();

  useEffect(() => {
    events.listen('scroll-bottom', 'organizations-page', async (target) => {
      if (
        organizations.canPaginate &&
        (await organizations.getData(organizations.data.length, 12, false, false)).okay
      ) {
        target.scrollTo({ top: target.scrollTop + 120, behavior: 'smooth' });
      }
    });
    return () => {
      events.unlisten('scroll-bottom', 'organizations-page');
    };
  }, [organizations]);

  return (
    <>
      <div className="organizations-wrap">
        {organizations.items.map((item, i) => (
          <OrganizationCard key={`org-${i}`} {...{ item, i }} />
        ))}
      </div>
      <Pagination />
    </>
  );
});
