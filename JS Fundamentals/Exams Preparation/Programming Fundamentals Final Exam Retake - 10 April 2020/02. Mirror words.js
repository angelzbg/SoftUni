mirrorWords = (words) => {
    let pairs = 0;
    let mirrors = [];
    let regEx = /([@#])(?<word1>[a-zA-Z]{3,})\1{2}(?<word2>[a-zA-Z]{3,})\1/g;
    while((result = regEx.exec(words))) {
        pairs++;
        let { word1, word2 } = result.groups;
        if(word1 === word2.split('').reverse().join('')) {
            mirrors.push(`${word1} <=> ${word2}`);
        }
    }

    console.log(`${pairs ? pairs : 'No'} word pairs found!`);
    console.log(mirrors.length ? `The mirror words are:\n${mirrors.join(', ')}` : 'No mirror words!');
};

mirrorWords([ '@mix#tix3dj#poOl##loOp#wl@@bong&song%4very$long@thong#Part##traP##@@leveL@@Level@##car#rac##tu@pack@@ckap@#rr#sAw##wAs#r#@w1r' ]);

mirrorWords([ '#po0l##l0op# @bAc##cAB@ @LM@ML@ #xxxXxx##xxxXxx# @aba@@ababa@' ]);

mirrorWords([ '#lol#lol# @#God@@doG@# #abC@@Cba# @Xyu@#uyX#' ]);