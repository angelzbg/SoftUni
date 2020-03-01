(input) => {
    const table = {
        'Premiere': 12,
        'Normal': 7.5,
        'Discount': 5
    };

    const type = input.shift();
    const r = Number(input.shift());
    const c = Number(input.shift());

    console.log((r * c * table[type]).toFixed(2) + ' leva');
}