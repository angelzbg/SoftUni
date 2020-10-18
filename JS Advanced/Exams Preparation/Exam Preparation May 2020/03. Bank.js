class Bank {
  constructor(bankName) {
    Object.assign(this, { _bankName: bankName, allCustomers: [] });
  }

  newCustomer = (customer) => {
    if (this.allCustomers.find((c) => c.personalId === customer.personalId)) {
      throw new Error(`${customer.firstName} ${customer.lastName} is already our customer!`);
    }

    this.allCustomers.push({ ...customer, totalMoney: 0, transactions: [] });
    return customer;
  };

  depositMoney = (personalId, amount) => {
    const customer = this.allCustomers.find((c) => c.personalId === personalId);
    if (!customer) {
      throw new Error('We have no customer with this ID!');
    }

    const transaction = `${customer.transactions.length + 1}. ${customer.firstName} ${
      customer.lastName
    } made deposit of ${+amount}$!`;

    customer.transactions.unshift(transaction);

    return (customer.totalMoney += +amount) + '$';
  };

  withdrawMoney = (personalId, amount) => {
    const customer = this.allCustomers.find((c) => c.personalId === personalId);
    if (!customer) {
      throw new Error('We have no customer with this ID!');
    }

    if (customer.totalMoney < +amount) {
      throw new Error(`${customer.firstName} ${customer.lastName} does not have enough money to withdraw that amount!`);
    }

    const transaction = `${customer.transactions.length + 1}. ${customer.firstName} ${
      customer.lastName
    } withdrew ${+amount}$!`;

    customer.transactions.unshift(transaction);

    return (customer.totalMoney -= +amount) + '$';
  };

  customerInfo = (personalId) => {
    const customer = this.allCustomers.find((c) => c.personalId === personalId);
    if (!customer) {
      throw new Error('We have no customer with this ID!');
    }

    return `Bank name: ${this._bankName}\nCustomer name: ${customer.firstName} ${customer.lastName}\nCustomer ID: ${
      customer.personalId
    }\nTotal Money: ${customer.totalMoney}$\nTransactions:\n${customer.transactions.join('\n')}`;
  };
}
