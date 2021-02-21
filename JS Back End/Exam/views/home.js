const home = ({ user, data, error, path }) => {
  return `
  ${
    !user
      ? `<p class="guest-message">
          MoneyGone? The best expense tracker tool of all time!<br />Аre you new here? <a href="/register">Register</a> yourself!
        </p>`
      : `
      <section class="actions">
        <form action="/" method="POST">
          <h2>Salary time? Refill your account amount.</h2>
          <input type="text" id="refillAmount" name="refillAmount"/>
          <button type="submit">Refill</button>
        </form>
        <div>
          <h2>New expense comming up?</h2>
          <a href="/add">Add it now</a>
        </div>
      </section>

      <hr class="separator" />

      ${
        user.expenses && user.expenses.length
          ? `<table class="expenses">
          <thead><tr><th>Merchant</th><th>Amount</th><th>Category</th><th>Description</th></tr></thead>
          <tbody>
            ${user.expenses
              .map(
                ({ _id, merchant, total, category, description, report }) => `
            <tr>
              <td><p>${merchant}</p>${
                  report ? `<div class="report"><a href="/details/${_id}">Report</a></div>` : ''
                }</td>
              <td><img src="${path}images/amount.png" alt="" /><p>лв ${total.toFixed(2)}</p></td>
              <td><img src="${path}images/category.png" alt="" /><p>${category}</p></td>
              <td><img src="${path}images/hastag.png" alt="" /><p>${description}</p></td>
            </tr>`
              )
              .join('')}
          </tbody>
        </table>`
          : '<h1 class="no-expenses">No expenses founded so far.. <span>GOOD JOB!</span></h1>'
      }
      `
  }`;
};

module.exports = home;
