primerNumberChecker = (num) => {
    let isPrime = (num) => {
        if(num === 2 || num === 3) return true;
        if(num % 2 === 0 || num % 3 === 0) return false;
        return true;
    }
    console.log(isPrime(num));
};