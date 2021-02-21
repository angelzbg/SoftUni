const { categories } = require('../utils/utils.js');

const add = ({ user, data, error, path }) => {
  let merchant = (total = category = description = report = '');
  if (data) {
    ({ merchant, total, category, description, report } = data);
  }

  return `
  <form action="/add" method="POST">
    <h1>Expense</h1>

    <div class="form-control">
      <label for="merchant">Merchant*</label>
      <input id="merchant" name="merchant" type="text" placeholder="Shoes" value="${merchant}"/>
    </div>

    <div class="form-control">
      <label for="total">Total*</label>
      <input id="total" name="total" type="text" placeholder="123.00" value="${total}"/>
      <select name="vault" id="vault">
        <option value="bgn">BGN лв</option>
      </select>
    </div>

    <div class="form-control">
      <label for="category">Category*</label>
      <select name="category" id="category">
        <option disabled ${category ? '' : 'selected'} value="default">Select category...</option>
        ${Object.entries(categories)
          .map(([val, name]) => `<option ${category === val ? 'selected' : ''} value="${val}">${name}</option>`)
          .join('')}
      </select>
    </div>

    <div class="form-control">
      <label for="description">Description*</label>
      <input id="description" name="description" type="text" placeholder="Shoes description..." value="${description}"/>
    </div>

    <div class="form-control">
      <label for="report">Report: </label>
      <input type="checkbox" name="report" id="report" ${report ? 'checked' : ''}/>
    </div>

    <button type="Submit">Save</button>
  </form>`;
};

module.exports = add;
