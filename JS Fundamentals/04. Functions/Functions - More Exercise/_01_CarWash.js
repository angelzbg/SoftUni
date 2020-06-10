carWash = (cmds) => {
    let progress = 0;
    let cleaner = {
        'soap': () => progress += 10,
        'water': () => progress *= 1.20,
        'vacuum cleaner': () => progress *= 1.25,
        'mud': () => progress *= 0.90
    };

    cmds.forEach(cmd => cleaner[cmd]());
  
    console.log(`The car is ${(progress).toFixed(2)}% clean.`);
};