import { parseHTMLElements } from '../../../scripts/utils.js';
import { database } from '../../../scripts/api.js';

export default ({ parent, route, routes, user, userTeam }) => {
  let isMounted = true;

  const children = parseHTMLElements(
    `<a href="#/${routes.create}" class="btn btn-default">Create Team</a>`,
    '<h1>Catalog Page</h1>',
    `<div>Loading...</div>`
  ).slice(userTeam ? 1 : 0);

  parent.append(...children);

  database.ref('teams').once('value', (snapshot) => {
    if (!isMounted) {
      return;
    }

    if (snapshot.exists()) {
      children[children.length - 1].textContent = '';
      const data = snapshot.val();
      const $teams = parseHTMLElements(
        ...Object.entries(data).map(
          ([id, { comment, creator, name }]) =>
            `<a href="#/${routes.catalog}/${id}" class="team-box">
                <span class="spanner">Team name</span>
                <span class="title">${name}</span>
                <span class="spanner">Description</span>
                ${comment ? `<p>${comment}</p>` : '<p>No description</p>'}
            </a>`
        )
      );
      children[children.length - 1].append(...$teams);
    } else {
      children[children.length - 1].textContent = 'Currently there are no teams.';
    }
  });

  return () => {
    isMounted = false;
    children.forEach((child) => parent.removeChild(child));
  };
};
