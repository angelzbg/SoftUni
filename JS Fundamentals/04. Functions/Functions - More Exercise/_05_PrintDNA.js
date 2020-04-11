printDNA = (rows) => {
    let pairs = ['AT', 'CG', 'TT', 'AG', 'GG'];
    let starSequence = [2, 1, 0, 1];
    let lineSequence = [0, 2, 4, 2];

    let output = '';

    for (let i = 0; i < rows; i++) {
        let pair = pairs.shift().split('');
        let starCount = starSequence.shift();
        let lineCount = lineSequence.shift();
        
        let stars = '*'.repeat(starCount);
        let lines = '-'.repeat(lineCount);

        output += `${stars}${pair[0]}${lines}${pair[1]}${stars}\n`;

        pairs.push(pair.join(''));
        starSequence.push(starCount);
        lineSequence.push(lineCount);
    }

    console.log(output); 
}