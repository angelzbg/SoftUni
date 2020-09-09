ticTacToe = (moves = []) => {
    const x = 3;
    const ticTac = new Array(x).fill([]).map(() => new Array(x).fill(false));

    const checkLine = (line) => (new Set(line).size === 1 && line[0] ? line[0] : false);

    const checkToe = (array) => {
        for (let i = 0; i < x; i++) {
            // row check
            let winner = checkLine(array[i]);
            if (winner) {
                return winner;
            }
        }

        // col check
        for (let i = 0; i < x; i++) {
            let line = [];
            for (let j = 0; j < x; j++) {
                line.push(array[j][i]);
            }

            let winner = checkLine(line);
            if (winner) {
                return winner;
            }
        }

        // main diagonal check
        let line = [];
        for (let i = 0; i < x; i++) {
            line.push(array[i][i]);
        }

        let winner = checkLine(line);
        if (winner) {
            return winner;
        }

        // opposite diagonal check
        line = [];
        for (let i = 0; i < x; i++) {
            line.push(array[i][x - i - 1]);
        }

        return checkLine(line);
    };

    let [counter, winner] = [0, undefined];
    while (moves.length) {
        let [r, c] = moves.shift().split(' ').map(Number);
        if (!!ticTac[r][c]) {
            console.log('This place is already taken. Please choose another!');
            continue;
        }

        ticTac[r][c] = counter % 2 === 0 ? 'X' : 'O';
        if ((winner = checkToe(ticTac)) || ++counter === 9) {
            break;
        }
    }

    console.log(winner ? `Player ${winner} wins!` : 'The game ended! Nobody wins :(');
    ticTac.forEach((row) => console.log(row.join('\t')));
};
