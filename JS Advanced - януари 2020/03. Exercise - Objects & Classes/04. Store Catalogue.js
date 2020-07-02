storageCatalogue = (data = []) => {
    return Object
        .entries(data.reduce((catalogue, productStr) => {
            let [name, price] = productStr.split(' : ');
            return Object.assign(catalogue, {[name]: Number(price)});
        }, {}))
        .sort((a, b) => a[0].localeCompare(b[0]))
        .reduce((sorted, [name, price]) => {
            sorted.catalogue.push(`${sorted.prevLetter !== name[0] ? `${name[0]}\n` : ''}  ${name}: ${price}`);
            sorted.prevLetter = name[0];
            return sorted;
        }, { catalogue: [], prevLetter: ''})
        .catalogue
        .join('\n');
};