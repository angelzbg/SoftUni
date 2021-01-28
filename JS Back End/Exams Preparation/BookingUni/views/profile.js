const profile = ({ user, data, error, path }) => {
  return `
  <section id="viewhotelDetails">
    <div class="profile"><img src="${path}img/profile.png" alt="default user">
        <h3>User Info:</h3>
        <div class="flex">
            <p>Username: </p>
            <p>${user.username}</p>
        </div>
        <div class="flex">
            <p>Email: </p>
            <p>${user.email}</p>
        </div>
        <div class="flex">
            <p>Reservations: </p>
            <p>
            ${
              user.booked && user.booked.length
                ? user.booked
                    .map(({ name }, i) => `<span>${name + (i === user.booked.length - 1 ? '' : ', ')}</span>`)
                    .join('')
                : '<span>None</span>'
            }
            </p>
        </div>
    </div>
    </section>`;
};

module.exports = profile;
