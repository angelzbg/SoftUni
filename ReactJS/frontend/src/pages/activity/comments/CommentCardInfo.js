import { observer } from 'mobx-react';
import { CheckIcon, ArrowRightIcon, ArrowLeftIcon } from '@primer/octicons-react';

export default observer(({ isFriend, requestTo, requestFrom }) =>
  isFriend ? (
    <div className="card-friends-linked" title="Connected">
      <CheckIcon />
    </div>
  ) : requestTo ? (
    <div className="card-request-to" title="Requested">
      <ArrowRightIcon />
    </div>
  ) : requestFrom ? (
    <div className="card-request-from" title="Request">
      <ArrowLeftIcon />
    </div>
  ) : null
);
