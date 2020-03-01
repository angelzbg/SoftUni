(input) => {
    const record = Number(input.shift());
    let distance = Number(input.shift()), timePerM = Number(input.shift());
    let secs = distance*timePerM;
    let bonus = Math.floor(distance/15)*12.5;
    secs+=bonus;
    if(secs >= record) {
        console.log(`No, he failed! He was ${(secs-record).toFixed(2)} seconds slower.`);
    } else {
        console.log(`Yes, he succeeded! The new world record is ${secs.toFixed(2)} seconds.`);
    }
}