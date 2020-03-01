(input) => {
    const num = Number(input.shift()),
            ed1 = input.shift(),
            ed2 = input.shift();
    if(ed1 === 'm') {
        if(ed2 === 'mm') {
            console.log((num*1000).toFixed(3));
        } else { // cm
            console.log((num*100).toFixed(3));
        }
    } else if(ed1 === 'mm') {
        if(ed2 == 'cm') {
            console.log((num/10).toFixed(3));
        } else { // m
            console.log((num/1000).toFixed(3));
        }
    } else { // ed1 = cm
        if(ed2 == 'mm') {
            console.log((num*10).toFixed(3));
        } else { // m
            console.log((num/100).toFixed(3));
        }
    }
}