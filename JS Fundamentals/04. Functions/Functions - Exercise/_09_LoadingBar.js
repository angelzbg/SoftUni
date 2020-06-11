loadingBar = (num) => {
    let progress = num / 10;

    if(progress === 10) {
        return console.log('100% Complete!\n[%%%%%%%%%%]');
    }
    
    let bar = `${num}% [${'%'.repeat(progress)}${'.'.repeat(10-progress)}]`;
    console.log(`${bar}\nStill loading...`);
};