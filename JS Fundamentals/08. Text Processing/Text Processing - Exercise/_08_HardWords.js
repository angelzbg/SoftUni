hardWords = ([string, words]) => {
    string.match(/_+/g).forEach(blank => {
        string = string.replace(blank, words.filter(w => w.length === blank.length)[0]);
    });
    console.log(string);
}