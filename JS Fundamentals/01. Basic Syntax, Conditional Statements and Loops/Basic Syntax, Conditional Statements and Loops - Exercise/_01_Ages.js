ages = (age) => {
    let output = '';
    if(age < 0) output = 'out of bounds';
    else if(age < 3) output = 'baby';
    else if(age < 14) output = 'child';
    else if(age < 20) output = 'teenager';
    else if(age < 66) output = 'adult';
    else output = 'elder';
    
    console.log(output);
};