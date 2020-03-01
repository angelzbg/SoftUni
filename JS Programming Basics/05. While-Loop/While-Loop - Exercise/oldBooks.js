(input) => {
    const search = input.shift();
    const index = input.indexOf(search);
    if(index > -1) console.log(`You checked ${index-1} books and found it.`);
    else console.log(`The book you search is not here!\nYou checked ${input.shift()} books.`);
}