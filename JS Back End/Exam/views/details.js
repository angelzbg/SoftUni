const details = ({ user, data, error, path }) => {
  const { _id, merchant, total, category, description, report } = data;
  return `
  <section class="expense-report">
    <h1>ID: ${data._id}</h1>

    <div class="report-category">
        <img src="${path}images/amount.png" alt="" />
        <p>${category} - лв ${total.toFixed(2)}</p>
    </div>

    <div class="report-merchant">
        <p>${merchant}</p>
    </div>

    <div class="report-description">
        <img src="${path}images/hastag.png" alt="" />
        <p>${description}</p>
    </div>

    ${
      report
        ? `<div class="report-action">
                <a disabled href="/delete/${_id}">Stop tracking</a>
            </div>`
        : ''
    }
</section>`;
};

module.exports = details;
