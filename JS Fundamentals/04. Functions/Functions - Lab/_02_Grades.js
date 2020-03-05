(score) => {
    let grade = 'Excellent';
    if(score < 3.00) grade = 'Fail';
    else if(score < 3.50) grade = 'Poor';
    else if(score < 4.50) grade = 'Good';
    else if(score < 5.50) grade = 'Very good';
    console.log(grade);
}