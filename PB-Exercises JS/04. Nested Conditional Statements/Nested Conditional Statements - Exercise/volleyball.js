(input) => {
    const yearType = input.shift();
    const p = Number(input.shift());
    const h = Number(input.shift());

    let games = (48-h)*0.75 + h + p*(2/3);
    if(yearType === 'leap') games*=1.15;

    console.log(Math.floor(games));
}