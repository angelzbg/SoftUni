softuniReception = (input = []) => {
    let people = +input.pop();
    const perHour = input.map(Number).reduce((a, b) => a + b, 0);
    let hours = 0;
    while (people > 0) {
        if (++hours % 4 !== 0) {
            people -= perHour;
        }
    }

    return `Time needed: ${hours}h.`;
};

console.log(softuniReception(['1', '2', '3', '45']));

//'new_pass_mid_exam'
