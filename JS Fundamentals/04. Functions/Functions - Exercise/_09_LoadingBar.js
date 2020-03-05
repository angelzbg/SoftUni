(num) => {
    let progress = num/10;

    if(progress === 10) {
        return console.log('100% Complete!\n[%%%%%%%%%%]');
    } else {
        let bar = `${num}% [`;

        for(let i=1; i<11; i++) {
            if(i <= progress) bar += '%';
            else bar += '.';
        }

        bar += ']';
        console.log(`${bar}\nStill loading...`);
    }
}