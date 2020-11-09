import { parseHTMLElement, parseHTMLElements, emailToUsername } from '../../../scripts/utils.js';
import { database, leaveTeam, joinTeam } from '../../../scripts/api.js';

export default ({ parent, route, routes, user, userTeam }) => {
  const teamUUID = route[1];
  let isMounted = true;

  const child = parseHTMLElement(
    `<div class="details-box">
        <span class="titlebar"></span>
        <span class="spanner">Team members</span>
        <div id="members"></div>
        <span class="spanner">Description</span>
        <p id="comment"></p>
        <span class="spanner">Team management</span>
    </div>`
  );

  parent.appendChild(child);

  database.ref(`teams/${teamUUID}`).once('value', (snapshot) => {
    if (!isMounted) {
      return;
    }

    const [$title, $comment] = [...child.querySelectorAll('span.titlebar, p#comment')];

    if (snapshot.exists()) {
      const { comment, name, creator } = snapshot.val();
      $title.textContent = `${name} details`;
      $comment.textContent = comment || 'No description';

      const isCreator = creator === user.email;

      if (isCreator) {
        const edit = parseHTMLElement(`<a href="#/${routes.create}/${teamUUID}" class="btn btn-default">Edit Info</a>`);
        child.appendChild(edit);
      }

      if (userTeam === teamUUID) {
        const leave = parseHTMLElement(`<a href="#/" class="btn btn-default">Leave Team</a>`);
        child.appendChild(leave);
        leave.addEventListener('click', (event) => {
          event.preventDefault();
          leaveTeam(user);
        });
      } else if (!userTeam) {
        const join = parseHTMLElement(`<a href="#/" class="btn btn-default">Join Team</a>`);
        child.appendChild(join);
        join.addEventListener('click', (event) => {
          event.preventDefault();
          joinTeam(user, teamUUID);
        });
      }

      database
        .ref('members')
        .orderByChild('team')
        .equalTo(teamUUID)
        .once('value', (snapshot) => {
          if (!isMounted) {
            return;
          }

          const $members = child.querySelector('div#members');

          if (snapshot.exists()) {
            $members.append(
              ...parseHTMLElements(
                ...Object.entries(snapshot.val()).map(
                  ([uid, { username }]) =>
                    `<div class="member">${emailToUsername(username)}${creator === username ? ' - Lead' : ''} ${
                      isCreator && username !== user.email
                        ? `<a data-id="${uid}" href="#/" class="btn btn-danger">Kick</a>`
                        : ''
                    }</div>`
                )
              )
            );

            if (isCreator) {
              $members.addEventListener('click', (event) => {
                event.preventDefault();
                if (event.target.tagName === 'A') {
                  leaveTeam({ uid: event.target.getAttribute('data-id') });
                  $members.removeChild(event.target.parentElement);
                }
              });
            }
          } else {
            $members.appendChild(parseHTMLElement('<p>No member info</p>'));
          }
        });
    } else {
      $title.textContent = `This team doesn't exist!`;
    }
  });

  return () => {
    isMounted = false;
    parent.removeChild(child);
  };
};
