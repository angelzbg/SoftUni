(input) => {

    let line = input.shift();
    let standart = 0, kid = 0, student = 0, currentFree = 0, currentCount = 0, currentName = '';

    while(line !== 'Finish') {

        if('standardkidstudent'.includes(line)) {
            if(currentFree > currentCount) {
                if(line === 'kid') kid++;
                else if(line === 'student') student++;
                else if(line === 'standard') standart++;
                currentCount++;
            }
        }
        else if(line === 'End') { /*... няма да трябва, само логически тук*/ }
        else {
            if(currentName.length > 0) console.log(`${currentName} - ${((100/currentFree*currentCount)).toFixed(2)}% full.`);
            currentName = line;
            currentFree = Number(input.shift());
            currentCount = 0;
        }

        line = input.shift();
    }
    console.log(`${currentName} - ${((100/currentFree*currentCount)).toFixed(2)}% full.`);
    
    const total = standart + kid + student;
    student = (100/total*student).toFixed(2) + '% student tickets.';
    standart = (100/total*standart).toFixed(2) + '% standard tickets.';
    kid = (100/total*kid).toFixed(2) + '% kids tickets.';

    console.log(`Total tickets: ${total}`);
    console.log(`${student}\n${standart}\n${kid}`);
}