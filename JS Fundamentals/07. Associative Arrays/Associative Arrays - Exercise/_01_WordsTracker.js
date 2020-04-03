wordsTracker = (arr) => {
    let words = {};
    arr.shift().split(' ').forEach(word => {
        words[word] = 0;
    });
    arr.forEach(word => {
        if(words[word] !== undefined) {
            words[word]++;
        }
    });
    Object.entries(words)
    .sort((a, b) => b[1] - a[1])
    .forEach(([word, count]) => {
        console.log(`${word} - ${count}`);
    });
}

wordsTracker([
    'this sentence', 'In','this','sentence','you','have','to','count','the','occurances','of','the'
    ,'words','this','and','sentence','because','this','is','your','task'
    ]);