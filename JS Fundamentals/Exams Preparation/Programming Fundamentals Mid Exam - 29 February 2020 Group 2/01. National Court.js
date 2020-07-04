nationalCourt = (input = []) => {
    let people = Number(input.pop());
    const perHour = input.map(Number).reduce((a, b) => a + b, 0);

    let hours = 0;
    while (people > 0) {
        if (++hours % 4 !== 0) {
            people -= perHour;
        }
    }

    return `Time needed: ${hours}h.`;
};

console.log(nationalCourt(['1', '2', '3', '45']));
