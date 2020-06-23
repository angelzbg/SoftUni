oddAndEvenSum = (num = 1) => {
    let numStr = num.toString();
    let oddSum = 0, evenSum = 0;
    
    for(let i = 0; i < numStr.length; i++) {
        let n = Number(numStr[i]);
        if(n % 2 === 0) {
            evenSum += n;
        } else {
            oddSum += n;
        }
    }

    console.log(`Odd sum = ${oddSum}, Even sum = ${evenSum}`);
};