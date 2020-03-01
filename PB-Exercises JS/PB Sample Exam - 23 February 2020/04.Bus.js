(input) => {
    let passangers = Number(input.shift()), stops = Number(input.shift());
    for(let i=1; i<=stops; i++) {
        passangers = passangers - Number(input.shift()) + Number(input.shift()) + (i % 2 == 1 ? 2 : -2);
    }
    console.log(`The final number of passengers is : ${passangers}`);
}