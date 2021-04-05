import { FlameIcon, OctofaceIcon, OrganizationIcon, SearchIcon, HistoryIcon } from '@primer/octicons-react';

export const wrappersIds = {
  userMenu: 'user-menu',
  notifMenu: 'notif-menu',
};

export const toggles = {
  main: 'main',
  themes: 'themes',
  notifications: 'notifications',
  closed: '',
};

export const getLinks = ({ devSection, orgSection, actSection }) => {
  return [
    { path: '/', name: 'Home', icon: FlameIcon },
    { path: `/developers/${devSection}`, name: 'Developers', icon: OctofaceIcon },
    { path: `/organizations/${orgSection}`, name: 'Organizations', icon: OrganizationIcon },
    { path: '/search', name: 'Search', icon: SearchIcon },
    { path: `/activity/${actSection}`, name: 'Activity', icon: HistoryIcon, auth: '/login' },
  ];
};
