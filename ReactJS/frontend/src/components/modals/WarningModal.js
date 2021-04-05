import { Portal } from 'react-portal';
import { observer } from 'mobx-react';
import { AlertIcon } from '@primer/octicons-react';

export default observer(({ onConfirm, onCancel, title }) => (
  <Portal node={document.querySelector('.app-wrapper')}>
    <div className="comments-modal">
      <div className="box">
        <div className="header">
          <AlertIcon size="medium" />
          Warning
        </div>
        <div className="title">{title}</div>
        <div className="buttons">
          <button className="decline" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  </Portal>
));
