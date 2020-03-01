(input) => {
    let ppl = Number(input.shift());

    let tablePpl = {};

    for(let i=0; i<ppl; i++) {
        let name = input.shift();
        let currentObj = {
            'cookies': 0,
            'cakes': 0,
            'waffles': 0
        }
        let line = input.shift();
        while(line !== 'Stop baking!') {
            currentObj[line]+=Number(input.shift());
            line = input.shift();
        }
        tablePpl[name] = currentObj;
    }

    let totalSum = 0, totalBakery = 0;
    Object.keys(tablePpl).forEach( keyName => {
        totalBakery += tablePpl[keyName]['cookies'] + tablePpl[keyName]['cakes'] + tablePpl[keyName]['waffles'];
        totalSum += tablePpl[keyName]['cookies'] * 1.5 + tablePpl[keyName]['cakes'] * 7.8 + tablePpl[keyName]['waffles'] * 2.3;
        console.log(`${keyName} baked ${tablePpl[keyName]['cookies']} cookies, ${tablePpl[keyName]['cakes']} cakes and ${tablePpl[keyName]['waffles']} waffles.`);
    });
    console.log(`All bakery sold: ${totalBakery}`);
    console.log(`Total sum for charity: ${totalSum.toFixed(2)} lv.`);
}