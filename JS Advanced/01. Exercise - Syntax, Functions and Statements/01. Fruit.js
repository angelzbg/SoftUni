fruit = (fruit = '', weightGramms = 1, pricePerKG = 1) => {
    const weightKG = weightGramms / 1000;
    const totalPrice = weightKG * pricePerKG;
    console.log(`I need $${totalPrice.toFixed(2)} to buy ${weightKG.toFixed(2)} kilograms ${fruit}.`);
};
