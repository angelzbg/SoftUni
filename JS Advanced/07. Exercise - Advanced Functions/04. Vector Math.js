vectorMath = {
    add: ([x1, y1], [x2, y2]) => [x1 + x2, y1 + y2],
    multiply: (vector, scalar) => vector.map((n) => n * scalar),
    length: ([x, y]) => Math.sqrt(x ** 2 + y ** 2),
    dot: ([x1, y1], [x2, y2]) => x1 * x2 + y1 * y2,
    cross: ([x1, y1], [x2, y2]) => x1 * y2 - y1 * x2,
};
