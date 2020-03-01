(input) => {
    const name = input.shift();
    let _class = 1;
    let sum = 0.00;
    let grade = 0;
    let retakes = 0;
    while(_class < 13) {
        grade = Number(input.shift());
        if(grade < 4) {
            retakes++;
            if(retakes == 2) break;
            continue;
        }
        sum+=grade;
        _class++;
    }
    if(retakes < 2) console.log(`${name} graduated. Average grade: ${(sum/12).toFixed(2)}`);
    else console.log(`${name} has been excluded at ${_class} grade`);
}