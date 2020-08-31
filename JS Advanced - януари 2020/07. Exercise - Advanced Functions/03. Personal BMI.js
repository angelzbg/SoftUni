getPersonalBMI = (name, age, weight, height) => {
    const statuses = { 19: 'underweight', 25: 'normal', 30: 'overweight' };

    const BMI = Math.round(weight / (height / 100) ** 2);
    const status = statuses[Object.keys(statuses).find((n) => BMI < n)] || 'obese';

    const person = { name, personalInfo: { age, weight, height }, BMI, status };

    if (status === 'obese') {
        person.recommendation = 'admission required';
    }

    return person;
};
