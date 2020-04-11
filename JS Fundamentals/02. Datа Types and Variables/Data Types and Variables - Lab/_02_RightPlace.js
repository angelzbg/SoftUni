rightPlace = (missing, ch, word) => {
    console.log(word === missing.replace('_', ch) ? 'Matched' : 'Not Matched');
}