(input) => {
    let line = input.shift(), sumPrime = 0, sumNonPrime = 0, num = 0;
    while(line !== 'stop') {
        num = Number(line);
        if(num < 0) console.log('Number is negative.');
        else {
            if( num == 2 || num == 3 || (num % 2 != 0 && num % 3 != 0) ) sumPrime += num;
            else sumNonPrime += num;
        }

        line = input.shift();
    }

    console.log(`Sum of all prime numbers is: ${sumPrime}`);
    console.log(`Sum of all non prime numbers is: ${sumNonPrime}`);
}