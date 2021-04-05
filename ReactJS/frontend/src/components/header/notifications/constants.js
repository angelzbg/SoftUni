import FriendRequest from './FriendRequest';
import AcceptedFriend from './AcceptedFriend';

const notificationTypes = {
  friendRequest: 'friend-request',
  friendAccepted: 'friend-accepted',
};

const notificationsComponents = {
  [notificationTypes.friendRequest]: (props) => <FriendRequest key={`notif-acc-${props.item._id}`} {...props} />,
  [notificationTypes.friendAccepted]: (props) => <AcceptedFriend key={`notif-acc-${props.item._id}`} {...props} />,
};

export { notificationTypes, notificationsComponents };
