ticTacToe = (moves = []) => {
    const x = 3;
    const ticTac = new Array(x).fill([]).map(() => new Array(x).fill(false));

    const checkToe = (array) => {
        for(let i = 0; i < x; i++) {
            // row check
            if(array[i].filter(el => el !== false && el === array[i][0]).length === x) {
                return array[i][0];
            }
        }

        // col check
        for(let i = 0; i < x; i++) {
            let winner = true;
            for(let j = 1; j < x; j++) {
                if(array[j][i] !== array[j-1][i] || array[j][i] === false) {
                    winner = false;
                    break;
                }
            }
            
            if(winner) {
                return array[0][i];
            }
        }

        // main diagonal check
        let winner = true;
        for(let i = 1; i < x; i++) {
            if(array[i][i] !== array[i-1][i-1] || array[i][i] === false) {
                winner = false;
                break;
            }
        }
        
        if(winner) {
            return array[0][0];
        }

        // opposite diagonal check
        winner = true;
        for(let i = 1; i < x; i++) {
            for(let j = x - 1; j > -1; j++) {
                if(array[i][j] !== array[i-1][j+1] || array[i][i] === false) {
                    winner = false;
                    break;
                }
            }
        }
        
        if(winner) {
            return array[0][2];
        }

        return false;
    };

    let counter = 0, winner;
    while(moves.length) {
        let [r, c] = moves.shift().split(' ').map(Number);
        while(ticTac[r][c] !== false && moves.length) {
            console.log('This place is already taken. Please choose another!')
            let [x, y] = moves.shift().split(' ').map(Number);
            [r, c] = [x, y];
        }

        ticTac[r][c] = counter % 2 === 0 ? 'X' : 'O';
        if((winner = checkToe(ticTac)) || ++counter === 9) {
            break;
        }
    }

    console.log(winner ? `Player ${winner} wins!` : 'The game ended! Nobody wins :(');
    ticTac.forEach(row => console.log(row.join('\t')));
};

ticTacToe(["0 0",
"0 0",
"1 1",
"0 1",
"1 2",
"0 2",
"2 2",
"1 2",
"2 2",
"2 1"]);