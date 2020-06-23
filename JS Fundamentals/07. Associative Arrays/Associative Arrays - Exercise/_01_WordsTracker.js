wordsTracker = (arr = []) => {
    let words = {};
    arr.shift().split(' ').forEach(word => {
        words[word] = 0;
    });

    arr.forEach(word => {
        if(words[word]) {
            words[word]++;
        }
    });
    
    Object.entries(words)
    .sort((a, b) => b[1] - a[1])
    .forEach(([word, count]) => {
        console.log(`${word} - ${count}`);
    });
};