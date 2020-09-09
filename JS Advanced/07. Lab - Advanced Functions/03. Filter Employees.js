filterEmployees = (employees = '', criteria = '') => {
    const [property, value] = criteria.split('-');
    return JSON.parse(employees)
        .filter((e) => e[property] === value)
        .map((e, i) => `${i}. ${e.first_name} ${e.last_name} - ${e.email}`)
        .join('\n');
};
