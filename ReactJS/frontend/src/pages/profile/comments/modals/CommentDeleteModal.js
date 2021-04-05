import { observer } from 'mobx-react';
import WarningModal from '../../../../components/modals/WarningModal';

export default observer(({ id, setDeleteId, action, user }) => (
  <WarningModal
    title="Deleting your comment is a permanent action. Do you wish to continue?"
    onCancel={() => setDeleteId()}
    onConfirm={() => action(user, 'delete', id)}
  />
));
