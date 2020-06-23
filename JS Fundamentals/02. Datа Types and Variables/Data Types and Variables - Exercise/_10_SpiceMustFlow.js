spiceMustFlow = (startingYield = 1) => {
    let [yieldStorage, yield, days] = [0, startingYield, 0];
    while(yield > 99) {
        [days, yieldStorage, yield] = [days + 1, yieldStorage + yield - 26, yield - 10];
    }
    
    yieldStorage -= yieldStorage > 25 ? 26 : yieldStorage;
    console.log(`${days}\n${yieldStorage}`);
};