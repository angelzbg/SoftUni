theatrePromotions = (day, age) => {
    if(age < 0 || age > 122) {
        return console.log('Error!');
    }
    
    let price = 0;
    if(day === 'Weekday') {
        if(age < 19) price = 12;
        else if(age < 65) price = 18;
        else price = 12;
    } else if(day === 'Weekend') {
        if(age < 19) price = 15;
        else if(age < 65) price = 20;
        else price = 15;
    } else { // Holiday
        if(age < 19) price = 5;
        else if(age < 65) price = 12;
        else price = 10;
    }
    
    console.log(`${price}$`);
};