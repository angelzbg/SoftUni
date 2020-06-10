catalogue = (products) => {
    products = products.map(p => p.split(' : ').join(': ')).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
    let currentLetter = products[0][0];
    console.log(currentLetter);
    products.forEach(p => {
        if(currentLetter !== p[0]) {
            currentLetter = p[0];
            console.log(currentLetter);
        }
        console.log(`  ${p}`);
    });
};