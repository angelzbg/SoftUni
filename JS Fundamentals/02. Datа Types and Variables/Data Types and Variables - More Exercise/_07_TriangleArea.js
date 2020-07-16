triangleArea = (a = 1, b = 1, c = 1) => {
    const s = (a + b + c) / 2;
    console.log(Math.sqrt(s * (s - a) * (s - b) * (s - c)));
};
