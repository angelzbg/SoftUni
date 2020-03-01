(input) => {
    let name = input.shift(),
        games = Number(input.shift());

    let table = {
        'volleyball': {
            total: 0,
            games: 0
        },
        'tennis': {
            total: 0,
            games: 0
        },
        'badminton': {
            total: 0,
            games: 0
        }
    }

    for(let i=1; i<=games; i++) {
        let game = input.shift(), score = Number(input.shift());
        table[game].total+=score;
        table[game].games++;
    }

    table['volleyball'].total*=1.07;
    table['tennis'].total*=1.05;
    table['badminton'].total*=1.02;

    let volleyballAvg = table['volleyball'].total/table['volleyball'].games,
        tennisAvg = table['tennis'].total/table['tennis'].games,
        badmintonAvg = table['badminton'].total/table['badminton'].games,
        totalScore = table['volleyball'].total + table['tennis'].total + table['badminton'].total;

    if(volleyballAvg >= 75 && tennisAvg >= 75 && badmintonAvg >= 75) console.log(`Congratulations, ${name}! You won the cruise games with ${Math.floor(totalScore)} points.`);
    else console.log(`Sorry, ${name}, you lost. Your points are only ${Math.floor(totalScore)}.`);
}