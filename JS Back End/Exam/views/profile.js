const profile = ({ user, data, error, path }) => {
  return `
  <table class="expenses-info">
    <thead>
        <tr>
            <th colspan="2">Expenses</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Total Amount:</td>
            <td>${data.totalAmount} BGN</td>
        </tr>
        <tr>
            <td>Total Merches</td>
            <td>${data.totalMerches}</td>
        </tr>
    </tbody>
    </table>

    <div class="current-amount">
        <p>Available amount: <span>${user.amount.toFixed(2)} BGN</span></p>
    </div>`;
};

module.exports = profile;
