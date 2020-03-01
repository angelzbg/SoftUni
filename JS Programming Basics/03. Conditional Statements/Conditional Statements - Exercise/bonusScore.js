(input) => {
    const num = Number(input.shift());
    let bonus = num <= 100 ? 5 : num > 1000 ? num*0.1 : num*0.2;
    if(num % 2 == 0) bonus++;
    else if(num % 10 == 5) bonus+=2;
    console.log(bonus + '\n' + (bonus+num));
}