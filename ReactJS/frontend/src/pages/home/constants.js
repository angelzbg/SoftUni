export const homeFilters = {
  Developers: 'Developers',
  Oragnization: 'Organizations',
};

export const homeFiltersActive = Object.values(homeFilters);

export const getContainers = () => {
  return [
    {
      title: 'New Local Developers',
      auth: true,
      prop: 'newDevsNear',
      filter: homeFilters.Developers,
      link: '/developers/new-local',
    },
    {
      title: 'New Local Organizations',
      auth: true,
      prop: 'newOrgsNear',
      filter: homeFilters.Oragnization,
      link: '/organizations/new-local',
    },
    { title: 'New Developers', prop: 'newDevs', filter: homeFilters.Developers, link: '/developers/new' },
    { title: 'New Organizations', prop: 'newOrgs', filter: homeFilters.Oragnization, link: '/organizations/new' },
    {
      title: 'Top Local Developers',
      auth: true,
      prop: 'topDevsNear',
      filter: homeFilters.Developers,
      link: '/developers/top-local',
    },
    {
      title: 'Top Local Organizations',
      auth: true,
      prop: 'topOrgsNear',
      filter: homeFilters.Oragnization,
      link: '/organizations/top-local',
    },
    { title: 'Top Developers', prop: 'topDevs', filter: homeFilters.Developers, link: '/developers/top' },
    { title: 'Top Organizations', prop: 'topOrgs', filter: homeFilters.Oragnization, link: '/organizations/top' },
  ];
};
