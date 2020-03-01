(input) => {
    const t1 = Number(input.shift()), t2 = Number(input.shift()), t3 = Number(input.shift()),
            total = t1+t2+t3;
    let minutes = total/60, seconds = total%60;
    console.log(Math.floor(minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds));
}