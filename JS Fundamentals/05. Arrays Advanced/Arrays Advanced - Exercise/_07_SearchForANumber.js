(arr, [ countTake, countDelete, searched ]) => {
    let collection = arr.slice(countDelete, countTake);
    console.log(`Number ${searched} occurs ${collection.filter( el => el === searched).length} times.`);
}