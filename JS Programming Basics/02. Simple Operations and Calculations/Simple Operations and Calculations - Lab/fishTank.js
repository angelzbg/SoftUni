(input) => {
    const duljina = Number(input.shift());
    const shirina = Number(input.shift());
    const visochina = Number(input.shift());
    const percent = Number(input.shift())*0.01;
    const obemDM = duljina*shirina*visochina*0.001;
    const needed = obemDM*(1-percent);
    console.log(needed.toFixed(3));
}