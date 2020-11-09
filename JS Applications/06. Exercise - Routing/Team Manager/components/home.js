import { parseHTMLElement } from '../scripts/utils.js';

export default ({ parent, route, routes, user, userTeam }) => {
  const child = parseHTMLElement(
    `<div>
        <h1>Home Page</h1>
        ${
          user
            ? userTeam
              ? `<a href="#/${routes.catalog}/${userTeam}">Go To Team</a>`
              : `<p>You are currently not a member of a team. View the <a href="#/${routes.catalog}">catalog</a> to join or create one.</p>`
            : `<p>You are currently not logged in. <a href="#/${routes.login}">Log in</a> / <a href="#/${routes.register}">Register</a></p>`
        }
    </div>`
  );

  parent.appendChild(child);

  return () => parent.removeChild(child);
};
