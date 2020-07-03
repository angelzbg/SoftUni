wordsUppercase = (text = '') => {
    let words = text.match(/\w+/g).map((word) => word.toUpperCase());
    console.log(words.join(', '));
};
