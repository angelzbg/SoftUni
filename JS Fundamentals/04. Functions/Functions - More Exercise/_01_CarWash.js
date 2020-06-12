carWash = (cmds) => {
    let progress = 0;

    const cleaner = {
        'soap': (x) => x + 10,
        'water': (x) => x * 1.20,
        'vacuum cleaner': (x) => x * 1.25,
        'mud': (x) => x * 0.90
    };

    cmds.forEach(cmd => progress = cleaner[cmd](progress));
  
    console.log(`The car is ${(progress).toFixed(2)}% clean.`);
};