(input) => {
    let points = Number(input[0]);

    let shoot = (type, score) => {
        switch(type) {
            case 'number section':
                return points-score;
            case 'double ring':
                return points-score*2;
            case 'triple ring':
                return points-score*3;
            default:
                return points;
        }
    };

    let len = input.length;
    let counter = 0;
    for(let i=1; i<len; i+=2) {
        counter++;
        let type = input[i];
        if(type === 'bullseye') {
            console.log(`Congratulations! You won the game with a bullseye in ${counter} moves!`);
            break;
        } else {
            let score = Number(input[i+1]);
            points = shoot(type, score);
            if(points == 0) {
                console.log(`Congratulations! You won the game in ${counter} moves!`);
                break;
            } else if(points < 0) {
                console.log(`Sorry, you lost. Score difference: ${Math.abs(points)}.`);
                break;
            }
        }
    }
}