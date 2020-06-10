schoolRegister = (input) => {
    let register = {};
    input.forEach(line => {
        let tokens = line.split(', '),
            grade = Number(tokens[1].split(': ')[1]) + 1,
            name = tokens[0].split(': ')[1],
            score = Number(tokens[2].split(': ')[1]);
        if (score > 3) {
            let student = { name, score };
            if (!register[grade]) {
                register[grade] = [ student ];
            } else {
                register[grade].push(student);
            }
        }
    });
    
    Object.keys(register).sort((a,b) => a - b).forEach(grade => {
        console.log(`${grade} Grade`);
        console.log(`List of students: ${register[grade].map(s => s.name).join(', ')}`);
        console.log(`Average annual grade from last year: ${(register[grade].map(s => s.score).reduce((a, b) => a + b, 0) / register[grade].length).toFixed(2)}\n`);
    });
};