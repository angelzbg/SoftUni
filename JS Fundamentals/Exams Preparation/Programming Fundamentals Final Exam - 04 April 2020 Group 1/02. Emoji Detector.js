emojiDetector = ([text = '']) => {
    const threshold = text.match(/[0-9]/g).reduce((a, b) => a * b, 1);
    let [emojis, cool] = [0, []];
    const pattern = /(\*\*|::)(?<emoji>[A-Z]{1}[a-z]{2,})\1/g;
    while ((result = pattern.exec(text))) {
        const emoji = result.groups.emoji;
        const sum = emoji.split('').reduce((sum, char) => sum + char.charCodeAt(), 0);
        emojis++;
        if (sum > threshold) {
            cool.push(result[0]);
        }
    }

    console.log(`Cool threshold: ${threshold}`);
    console.log(`${emojis} emojis found in the text. The cool ones are:`);
    console.log(cool.join('\n'));
};

emojiDetector([
    'In the Sofia Zoo there are 311 animals in total! ::Smiley:: This includes 3 **Tigers**, 1 ::Elephant:, 12 **Monk3ys**, a **Gorilla::, 5 ::fox:es: and 21 different types of :Snak::Es::. ::Mooning:: **Shy**',
]);
