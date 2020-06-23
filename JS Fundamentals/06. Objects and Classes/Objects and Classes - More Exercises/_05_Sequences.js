sequences = (input = []) => {
    // Kopirano ot drug ama to tva e mn gotino, nqma da go izmislq po-umno xD
    input = input
        .map(JSON.parse)
        .map(el => el.sort((a, b) => b - a))
        .map(JSON.stringify);
    [...new Set(input)]
        .map(JSON.parse)
        .sort((a, b) => a.length - b.length)
        .forEach(el => console.log(`[${el.join(', ')}]`));
};