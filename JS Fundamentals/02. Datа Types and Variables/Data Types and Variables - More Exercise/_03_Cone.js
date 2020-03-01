(r, h) => {
    console.log(`volume = ${((Math.PI*Math.pow(r, 2)*h)/3).toFixed(4)}`);
    let s = Math.sqrt(r*r + h*h);
    let area = Math.PI*r*s + Math.PI*r*r;
    console.log(`area = ${area.toFixed(4)}`);
}