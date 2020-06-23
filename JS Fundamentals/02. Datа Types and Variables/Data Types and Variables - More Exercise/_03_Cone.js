cone = (r = 1, h = 1) => {
    console.log(`volume = ${((Math.PI * Math.pow(r, 2) * h) / 3).toFixed(4)}`);
    const s = Math.sqrt(r * r + h * h);
    const area = Math.PI * r * s + Math.PI * r * r;
    console.log(`area = ${area.toFixed(4)}`);
};