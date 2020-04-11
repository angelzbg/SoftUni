revealWords = (words, string) => {
    string.match(/\*+/g)
    .map(w => {return { censored: w, word: words.split(', ').filter(x => x.length === w.length)[0] };})
    .forEach(x => string = string.replace(x.censored, x.word));
    console.log(string);
}