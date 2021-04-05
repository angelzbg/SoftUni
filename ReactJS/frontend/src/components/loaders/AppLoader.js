import './styles/loaders.css';
import { SyncIcon } from '@primer/octicons-react';
import { observer } from 'mobx-react';
import { useStore } from '../../store/store';

export default observer(() => {
  const { isLoading } = useStore();

  if (isLoading) {
    return (
      <div className="app-loader">
        <SyncIcon size="medium" />
      </div>
    );
  }

  return null;
});
