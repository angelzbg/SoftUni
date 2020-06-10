gladiatorExpenses = (loses, _$Helmet, _$Sword, _$Shield, _$Armor) => {
    let price = 0;

    for(let f = 1; f <= loses; f++) {
        let isSecond = f % 2 === 0,
            isThird = f % 3 === 0;

        if(isSecond) price += _$Helmet;
        if(isThird) price += _$Sword;
        if(isSecond && isThird) price += _$Shield;
        if(f % 12 === 0) price += _$Armor;
    }

    console.log(`Gladiator expenses: ${price.toFixed(2)} aureus`);
};