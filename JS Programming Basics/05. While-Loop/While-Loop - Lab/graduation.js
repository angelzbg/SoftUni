(input) => {
    const name = input.shift();
    let _class = 1;
    let sum = 0.00;
    let grade = 0;
    while(_class < 13) {
        grade = Number(input.shift());
        if(grade < 4) continue;
        sum+=grade;
        _class++;
    }
    console.log(`${name} graduated. Average grade: ${(sum/12).toFixed(2)}`);
}