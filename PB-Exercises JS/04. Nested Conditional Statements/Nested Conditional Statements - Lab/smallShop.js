(input) => {
    const table = {
        'coffee': {
            'Sofia': 0.5,
            'Plovdiv': 0.4,
            'Varna': 0.45
        },
        'water': {
            'Sofia': 0.8,
            'Plovdiv': 0.7,
            'Varna': 0.7
        },
        'beer': {
            'Sofia': 1.2,
            'Plovdiv': 1.15,
            'Varna': 1.1
        },
        'sweets': {
            'Sofia': 1.45,
            'Plovdiv': 1.3,
            'Varna': 1.36
        },
        'peanuts': {
            'Sofia': 1.6,
            'Plovdiv': 1.5,
            'Varna': 1.55
        }
    };
    const product = input.shift();
    const city = input.shift();
    const quantity = Number(input.shift());

    console.log(table[product][city]*quantity);
}