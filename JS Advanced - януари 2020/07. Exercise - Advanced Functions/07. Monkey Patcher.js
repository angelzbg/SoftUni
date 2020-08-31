monkeyPatcher = (() => {
    const commands = {
        upvote: (object) => (object.upvotes += 1),
        downvote: (object) => (object.downvotes += 1),
        score: (object) => {
            const { upvotes, downvotes } = object;
            let obfuscationNumber = 0;

            const [total, balance] = [upvotes + downvotes, upvotes - downvotes];

            if (total > 50) {
                obfuscationNumber = Math.ceil(0.25 * Math.max(upvotes, downvotes));
            }

            let rating = 'new';

            if (total < 10) {
                rating = 'new';
            } else if (upvotes / total > 0.66) {
                rating = 'hot';
            } else if (downvotes / total <= 0.66 && balance >= 0 && (upvotes > 100 || downvotes > 100)) {
                rating = 'controversial';
            } else if (balance < 0 && total >= 10) {
                rating = 'unpopular';
            }

            return [upvotes + obfuscationNumber, downvotes + obfuscationNumber, balance, rating];
        },
    };

    return { call: (object, args) => commands[args](object) };
})();
