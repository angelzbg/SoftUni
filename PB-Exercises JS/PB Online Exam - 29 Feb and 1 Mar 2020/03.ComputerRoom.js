(input) => {
    let month = input.shift(), hours = Number(input.shift()), group = Number(input.shift()), isDay = input.shift() === 'day';

    let price = 0, months = [ 'march', 'april', 'may' ];
    if(months.indexOf(month) !== -1) {
        if(isDay) price = 10.50;
        else price = 8.40;
    } else { //  "june", "july", "august"
        if(isDay) price = 12.60;
        else price = 10.20;
    }

    if(group >= 4) price *= 0.90;
    if(hours >= 5) price /= 2;

    let groupPrice = price * group * hours;

    console.log(`Price per person for one hour: ${price.toFixed(2)}`);
    console.log(`Total cost of the visit: ${groupPrice.toFixed(2)}`);
}