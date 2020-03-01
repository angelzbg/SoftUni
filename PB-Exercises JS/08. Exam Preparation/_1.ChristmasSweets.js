(input) => {
    const   cenaBaklava = +input.shift(),
            cenaMufini = +input.shift(),
            cenaShtolen = cenaBaklava*1.6,
            cenaBonboni = cenaMufini*1.8,
            cenaBiskviti = 7.5,
            // ----------------
            kgShtolen = +input.shift(),
            kgBonboni = +input.shift(),
            kgBiskviti = +input.shift();
    console.log((kgShtolen*cenaShtolen + kgBonboni*cenaBonboni + kgBiskviti*cenaBiskviti).toFixed(2));
}