import teams from './components/teams.js';
import team from './components/team.js';

export default ({ parent, route, routes, user, userTeam }) => {
  let willUnmount;
  if (route[1]) {
    willUnmount = team({ parent, route, routes, user, userTeam });
  } else {
    willUnmount = teams({ parent, route, routes, user, userTeam });
  }

  return willUnmount;
};
