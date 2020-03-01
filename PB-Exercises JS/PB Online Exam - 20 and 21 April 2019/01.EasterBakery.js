(input) => {
    let _$Brashno = Number(input.shift()),
        kgBrashno = Number(input.shift()),
        kgZahar = Number(input.shift()),
        krQica = Number(input.shift()),
        pkMaq = Number(input.shift()),
        _$Zahar = _$Brashno*0.75,
        _$Qica = _$Brashno*1.10,
        _$Maq = _$Zahar*0.20;

    let price = _$Brashno*kgBrashno + _$Zahar*kgZahar + _$Qica*krQica + _$Maq*pkMaq;
    console.log(price.toFixed(2));
}