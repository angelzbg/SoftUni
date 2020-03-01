(input) => {
    let _$food = Number(input.shift()), _$souvenirs = Number(input.shift()), _$hotel = Number(input.shift()), _$gas = 54.39;
    let price = 3 * _$food + 3 * _$souvenirs + _$hotel * 0.9 + _$hotel * 0.85 + _$hotel * 0.8 + _$gas;
    console.log(`Money needed: ${price.toFixed(2)}`);
}