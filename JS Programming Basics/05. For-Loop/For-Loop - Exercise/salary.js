(input) => {
    let salary = Number(input[1]);
    for(let i=2; i<input.length; i++) {
        if(input[i] === 'Facebook') salary -= 150;
        else if(input[i] === 'Instagram') salary -= 100;
        else if(input[i] === 'Reddit') salary -= 50;
        if(salary <= 0) {
            salary = 0;
            break;
        }
    }

    console.log(salary == 0 ? 'You have lost your salary.' : salary);
}