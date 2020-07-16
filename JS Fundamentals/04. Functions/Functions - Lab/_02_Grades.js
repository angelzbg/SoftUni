grades = (score = 1) => {
    /*
    let grade = 'Excellent';
    if(score < 3.00) grade = 'Fail';
    else if(score < 3.50) grade = 'Poor';
    else if(score < 4.50) grade = 'Good';
    else if(score < 5.50) grade = 'Very good';
    console.log(grade);
    //*/

    ///*
    // const grades = [ undefined, undefined, 'Fail', 'Poor', 'Good', 'Very good', 'Excellent' ];
    const grades = { 2: 'Fail', 3: 'Poor', 4: 'Good', 5: 'Very good', 6: 'Excellent' };
    const int = Math.trunc(score),
        fract = score - int;
    const grade = int + (fract >= 0.5 && int !== 2 ? 1 : 0);

    console.log(grades[grade]);
    //*/
};
