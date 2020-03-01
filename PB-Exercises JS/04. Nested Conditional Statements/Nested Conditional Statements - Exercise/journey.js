(input) => {
    const budget = Number(input.shift());
    const season = input.shift();

    let dest = "", type = "", price = 0;
    if(budget <= 100) {
        dest = 'Bulgaria';
        type = season === 'summer' ? 'Camp' : 'Hotel';
        price = season === 'summer' ? budget*0.3 : budget*0.7;
    } else if(budget <= 1000) {
        dest = 'Balkans';
        type = season === 'summer' ? 'Camp' : 'Hotel';
        price = season === 'summer' ? budget*0.4 : budget*0.8;
    } else {
        dest = 'Europe';
        type = 'Hotel';
        price = budget*0.9;
    }
    console.log(`Somewhere in ${dest}\n${type} - ${price.toFixed(2)}`);
}