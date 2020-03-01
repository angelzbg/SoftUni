(input) => {
    const x1 = Number(input.shift()),
            y1 = Number(input.shift()),
            x2 = Number(input.shift()),
            y2 = Number(input.shift()),
            x = Number(input.shift()),
            y = Number(input.shift());

    const con1 = x >= x1 && x <= x2 && (y == y1 || y == y2);
    const con2 = y >= y1 && y <= y2 && (x == x1 || x == x2);
    console.log(con1 || con2 ? 'Border' : 'Inside / Outside');
}