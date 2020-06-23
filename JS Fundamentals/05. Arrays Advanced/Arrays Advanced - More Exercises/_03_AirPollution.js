airPollution = (matrix = [], commands = []) => {
    matrix = matrix.map(row => row.split(' ').map(Number));

    for (const line of commands) {
        let split = line.split(' ');
        let cmd = split[0];
        let value = Number(split[1]);

        if (cmd === 'breeze' && value >= 0 && value < matrix.length) {
            for (let j = 0; j < matrix[value].length; j++) {
                matrix[value][j] -= 15;
                if (matrix[value][j] < 0) {
                    matrix[value][j] = 0;
                }
            }
        } else if (cmd === 'gale') {
            for (let i = 0; i < matrix.length; i++) {
                if (value >= 0 && value < matrix[i].length) {
                    matrix[i][value] -= 20;
                    if (matrix[i][value] < 0) {
                        matrix[i][value] = 0;
                    }
                }
            }
        } else if (cmd === 'smog') {
            for (let i = 0; i < matrix.length; i++) {
                for (let j = 0; j < matrix[i].length; j++) {
                    matrix[i][j] += value;
                }
            }
        }
    }

    let polutedAreas = [];
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] >= 50) {
                polutedAreas.push(`[${i}-${j}]`);
            }
        }
    }

    console.log(polutedAreas.length > 0 ? `Polluted areas: ${polutedAreas.join(', ')}` : 'No polluted areas');
};