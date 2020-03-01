(num) => {
    let output = 'Not divisible', leftPart = 'The number is divisible by ';
    if(num % 10 == 0) output = leftPart + '10';
    else if(num % 7 == 0) output = leftPart + '7';
    else if(num % 6 == 0) output = leftPart + '6';
    else if(num % 3 == 0) output = leftPart + '3';
    else if(num % 2 == 0) output = leftPart + '2';
    console.log(output);
}