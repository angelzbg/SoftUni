centuriesToMinutes = (c) => {
    console.log(`${c} centuries = ${(y = c * 100)} years = ${(d = Math.trunc(y * 365.2422))} days = ${(h = d * 24)} hours = ${(m = h * 60)} minutes`);
}