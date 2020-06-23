gladiatorExpenses = (loses = 1, _$Helmet = 1, _$Sword = 1, _$Shield = 1, _$Armor = 1) => {
    let price = 0;

    for(let f = 1; f <= loses; f++) {
        let [isSecond, isThird, shouldUpdateArmor] = [f % 2 === 0, f % 3 === 0, f % 12 === 0];

        if(isSecond) price += _$Helmet;
        if(isThird) price += _$Sword;
        if(isSecond && isThird) price += _$Shield;
        if(shouldUpdateArmor) price += _$Armor;
    }

    console.log(`Gladiator expenses: ${price.toFixed(2)} aureus`);
};