(dist, pass, priceL) => {
    let neededFuel = (dist / 100) * 7 + pass * 0.100;
    let money = priceL * neededFuel;
    console.log(`Needed money for that trip is ${money}lv.`);
}