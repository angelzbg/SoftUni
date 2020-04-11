minerTask = (arr) => {
    // 75/100 na tazi glupava zadacha? COVID-19 ?
    const mined = {};
    while(arr.length > 0) {
        let res = arr.shift(), value = Number(arr.shift());
        mined[res] = value + (mined[res] || 0);
    }
    Object.entries(mined).forEach(([res, value]) => {
        console.log(`${res} -> ${value}`);
    });
}