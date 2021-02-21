const categories = {
  advertising: 'Advertising',
  benefits: 'Benefits',
  car: 'Car',
  equipment: 'Equipment',
  fees: 'Fees',
  'home-office': 'Home Office',
  insurance: 'Insurance',
  interest: 'Interest',
  Labor: 'Labor',
  maintenance: 'Maintenance',
  materials: 'Materials',
  'meals-and-entertainment': 'Meals and Entertainment',
  'office-supplies': 'Office Supplies',
  other: 'Other',
  'professional-services': 'Professional Services',
  rent: 'Rent',
  taxes: 'Taxes',
  travel: 'Travel',
  utilities: 'Utilities',
};

const validateData = ({ merchant, total, category, description, report }) => {
  if (!merchant || merchant.length < 4) {
    return 'Merchant must be at least 4 characters!';
  }

  try {
    const number = parseFloat(total);
    if (isNaN(number) || number < 0.01) {
      return 'Total should be positive number!';
    }
  } catch (ex) {
    return 'Total should be positive number!';
  }

  if (!Object.keys(categories).includes(category)) {
    return 'Invalid category!';
  }

  if (!description || description.length < 3 || description.length > 30) {
    return 'Description should be between 3 and 30 characters long!';
  }
};

module.exports = { validateData, categories };
