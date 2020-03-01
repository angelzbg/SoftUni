(missing, ch, word) => {
    if(word === missing.replace('_', ch)) console.log('Matched');
    else console.log('Not Matched');
}