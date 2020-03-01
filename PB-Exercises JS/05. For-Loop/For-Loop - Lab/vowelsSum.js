(input) => {
    const word = input.shift(), len = word.length,
            vowels = {
                'a' : 1,
                'e' : 2,
                'i' : 3,
                'o' : 4,
                'u' : 5
            };

    let sum = 0;
    for(let i=0; i<len; i++) {
        if(vowels[word[i]] !== undefined) sum += vowels[word[i]];
    }
    console.log(sum);
}