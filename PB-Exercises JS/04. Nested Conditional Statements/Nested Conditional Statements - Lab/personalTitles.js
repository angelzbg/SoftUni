(input) => {
    const age = Number(input.shift());
    const gender = input.shift();
    if(gender === 'm') console.log(age >= 16 ? 'Mr.' : 'Master');
    else console.log(age >= 16 ? 'Ms.' : 'Miss');
}