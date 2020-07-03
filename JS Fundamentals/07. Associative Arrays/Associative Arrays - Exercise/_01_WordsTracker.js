wordsTracker = (arr = []) => {
  return Object.entries(
    arr.reduce(
      (words, word) =>
        words[word] !== undefined
          ? Object.assign(words, { [word]: words[word] + 1 })
          : words,
      arr
        .shift()
        .split(" ")
        .reduce((initial, word) => Object.assign(initial, { [word]: 0 }), {})
    )
  )
    .sort((a, b) => b[1] - a[1])
    .map(([word, count]) => `${word} - ${count}`)
    .join("\n");
};