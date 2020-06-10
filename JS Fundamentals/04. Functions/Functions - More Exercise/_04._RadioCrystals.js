radioCrystals = (input) => {
    let Operations = {
        cut: (x) => x / 4,
        lap: (x) => x * 0.8,
        grind: (x) => x - 20,
        etch: (x) => x - 2,
        xRay: (x) => x + 1,
        Cut: 0,
        Lap: 0,
        Grind: 0,
        Etch: 0
    };
    let print = (operation) => {
        if(Operations[operation] > 0) {
            console.log(`${operation} x${Operations[operation]}\nTransporting and washing`);
        }
    };

    for (let i = 1; i < input.length; i++) {
        let currentThickness = input[i];
        let targetThickness = input[0];

        console.log(`Processing chunk ${currentThickness} microns`);

        while(currentThickness / 4 >= targetThickness - 1) {
            currentThickness = Math.floor(Operations.cut(currentThickness));
            Operations.Cut++;
        }
        print('Cut');

        while(currentThickness * 0.8 >= targetThickness - 1) {
            currentThickness = Math.floor(Operations.lap(currentThickness));
            Operations.Lap++;
        }
        print('Lap');

        while(currentThickness - 20 >= targetThickness - 1) {
            currentThickness = Operations.grind(currentThickness);
            Operations.Grind++;
        }
        print('Grind');

        while(currentThickness - 2 >= targetThickness - 1) {
            currentThickness = Operations.etch(currentThickness);
            Operations.Etch++;
        }
        print('Etch');

        if(currentThickness === targetThickness - 1) {
            currentThickness = Operations.xRay(currentThickness);
            console.log(`X-ray x1`);
            console.log(`Finished crystal ${currentThickness} microns`);
        }
        else {
            console.log(`Finished crystal ${currentThickness} microns`);
        }
    }
};