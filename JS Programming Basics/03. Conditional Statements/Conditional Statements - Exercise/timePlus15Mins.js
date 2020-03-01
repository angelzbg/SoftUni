(input) => {
    let h = Number(input.shift()), m = Number(input.shift())+15;
    if(m >= 60) {
        m = m-60;
        h++;
    }
    if(h>23) h = 0;
    console.log(h + ':' + (m < 10 ? '0' + m : m));
}