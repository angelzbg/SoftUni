(input) => {
    let hours = Number(input.shift()),
        fuelPer100 = Number(input.shift()),
        distance = 384400*2,
        time = Math.ceil(distance/hours)+3,
        fuel = fuelPer100*(distance/100);
    console.log(time);
    console.log(fuel);
}