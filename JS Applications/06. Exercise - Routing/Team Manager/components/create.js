import { parseHTMLElement, notify } from '../scripts/utils.js';
import { database, joinTeam } from '../scripts/api.js';

export default ({ parent, route, routes, user, userTeam }) => {
  const teamUUID = route[1];
  let isMounted = true;

  const child = parseHTMLElement(
    `<div>
        <h1>${teamUUID ? 'Edit Page' : 'Create Page'}</h1>
        <form>
            <div class="form-group">
                <label for="name">${teamUUID ? 'New ' : ''}Team Name:</label>
                <input class="form-control" type="text" id="name" name="name" value=""/>
            </div>
            <div class="form-group">
                <label for="comment">${teamUUID ? 'New ' : ''}Team Comment/Description: </label>
                <input class="form-control" type="text" id="comment" name="comment" value=""/>
            </div>
            <input class="btn btn-default" type="submit" value="${teamUUID ? 'Update' : 'Create'} Team"/>
        </form>
    </div>`
  );

  parent.appendChild(child);

  const [$name, $comment] = [...child.querySelectorAll('input')];
  const form = child.querySelector('form');

  if (teamUUID) {
    database.ref(`teams/${teamUUID}`).once('value', (snapshot) => {
      if (!isMounted) {
        return;
      }

      if (snapshot.exists()) {
        const { name, comment } = snapshot.val();
        [$name.value, $comment.value] = [name, comment];
        form.addEventListener('submit', (event) => {
          event.preventDefault();
          database
            .ref(`teams/${teamUUID}`)
            .set({ name: $name.value, comment: $comment.value, creator: user.email }, (error) => {
              if (error) {
                notify(error);
              } else {
                notify(`Successfully updated team!`, false);
                if (isMounted) {
                  window.location.hash = `#/${routes.catalog}/${teamUUID}`;
                }
              }
            });
        });
      } else {
        window.location.hash = `/#${routes.catalog}`;
      }
    });
  } else {
    const key = database.ref('teams').push().key;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      database.ref(`teams/${key}`).set({ name: $name.value, comment: $comment.value, creator: user.email }, (error) => {
        if (error) {
          notify(error);
        } else {
          notify(`Successfully created team!`, false);
          joinTeam(user, key, `#/${routes.catalog}/${key}`);
        }
      });
    });
  }

  return () => {
    isMounted = false;
    parent.removeChild(child);
  };
};
