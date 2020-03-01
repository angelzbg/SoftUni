(input) => {
    const unsatisf = Number(input.shift()), count = (input.length-1)/2;
    let currentUnsatisf = 0, score = 0, line = input.shift(), name = '', grade = 0;
    while(line !== 'Enough') {
        name = line;
        grade = Number(input.shift());
        if(grade <= 4 && ++currentUnsatisf == unsatisf) break;
        score+=grade;
        line = input.shift();
    }

    if(currentUnsatisf == unsatisf) console.log(`You need a break, ${unsatisf} poor grades.`);
    else console.log(`Average score: ${(score/count).toFixed(2)}\nNumber of problems: ${count}\nLast problem: ${name}`);
}