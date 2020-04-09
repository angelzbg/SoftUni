furniture = (furniture) => {
    let price = 0;
    console.log('Bought furniture:');
    let pattern = />>(?<name>.+)<<(?<price>\d+(?:\.\d+)?)!(?<count>\d+)/;
    while( (line = furniture.shift()) !== 'Purchase' ) {
        if( (result = line.match(pattern)) !== null) {
            console.log(result.groups.name);
            price += Number(result.groups.price) * Number(result.groups.count);
        }
    }
    console.log(`Total money spend: ${price.toFixed(2)}`);
}

furniture([ '>>Sofa<<312.23!3', '>>TV<<300!5', '>Invalid<<!5', 'Purchase' ]);