(ppl, type, day) => {
    let table = {
        'Students': {
            'Friday': ppl*8.45*(ppl > 29 ? 0.85: 1),
            'Saturday': ppl*9.8*(ppl > 29 ? 0.85: 1),
            'Sunday': ppl*10.46*(ppl > 29 ? 0.85: 1)
        },
        'Business': {
            'Friday': (ppl > 99 ? ppl-10 : ppl)*10.9,
            'Saturday': (ppl > 99 ? ppl-10 : ppl)*15.6,
            'Sunday': (ppl > 99 ? ppl-10 : ppl)*16
        },
        'Regular': {
            'Friday': ppl*15*(ppl > 9 && ppl < 21 ? 0.95: 1),
            'Saturday': ppl*20*(ppl > 9 && ppl < 21 ? 0.95: 1),
            'Sunday': ppl*22.5*(ppl > 9 && ppl < 21 ? 0.95: 1)
        }
    }
    console.log(`Total price: ${table[type][day].toFixed(2)}`);
}