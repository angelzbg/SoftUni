import { observer } from 'mobx-react';
import { useStore } from '../../../store/store';
import { ArrowLeftIcon, ArrowRightIcon, XIcon } from '@primer/octicons-react';

export default observer(({ id, syncing, setSync, sync }) => {
  const { user, friends, requests, sendRequest, acceptRequest, removeRequest, removeFriend } = useStore();

  const friendId = friends.find(({ users }) => users.findIndex(({ _id }) => _id === id) !== -1)?._id;
  const request = requests.find(({ sender, receiver }) => sender._id === id || receiver._id === id);

  const checkHandler = () => (syncing ? false : setSync(true));

  const handle = async (callback, ...params) =>
    checkHandler() ? ((await callback(...params)).okay ? setSync(false) : sync(id)) : null;

  const handlers = {
    sendRequest: (profileId) => handle(sendRequest, profileId),
    acceptRequest: (requestId) => handle(acceptRequest, requestId),
    removeRequest: (requestId) => handle(removeRequest, requestId),
    removeFriend: (friendId) => handle(removeFriend, friendId),
  };

  return (
    <div className={`profile-card-link-wrap ${syncing ? 'disabled' : ''}`}>
      {friendId ? (
        <div className="p-link-remove-button" onClick={() => handlers.removeFriend(friendId)}>
          <XIcon /> Remove
        </div>
      ) : request ? (
        request.sender._id === user._id ? (
          <div className="p-link-decline-button" onClick={() => handlers.removeRequest(request._id)}>
            <XIcon /> Cancel
          </div>
        ) : (
          <>
            <div className="p-link-accept-button" onClick={() => handlers.acceptRequest(request._id)}>
              <ArrowLeftIcon /> Accept
            </div>
            <div className="p-link-decline-button" onClick={() => handlers.removeRequest(request._id)}>
              <XIcon /> Decline
            </div>
          </>
        )
      ) : (
        <div className="p-link-add-button" onClick={() => handlers.sendRequest(id)}>
          Add <ArrowRightIcon />
        </div>
      )}
    </div>
  );
});
