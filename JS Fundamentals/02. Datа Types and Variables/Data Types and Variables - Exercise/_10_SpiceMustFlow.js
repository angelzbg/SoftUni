spiceMustFlow = (startingYield) => {
    let yieldStorage = 0;
    let yield = startingYield;
    let days = 0;
    while(yield > 99) {
        days++;
        yieldStorage += yield;
        yieldStorage -= 26;
        yield -= 10;
    }
    yieldStorage -= yieldStorage > 25 ? 26 : yieldStorage;
    console.log(`${days}\n${yieldStorage}`);
};