(c) => {
    let y = c * 100,
        d = Math.trunc(y * 365.2422),
        h = d * 24,
        m = h * 60;
        console.log(`${c} centuries = ${y} years = ${d} days = ${h} hours = ${m} minutes`);
}