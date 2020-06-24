validityChecker = ([ x1 = 1, y1 = 1, x2 = 1, y2 = 1 ] = []) => {
    const validateDistance = ([ x1 = 1, y1 = 1, x2 = 1, y2 = 1 ] = []) => {
        const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${Number.isInteger(distance) ? 'valid' : 'invalid'}`);
    };

    validateDistance([x1, y1, 0, 0]);
    validateDistance([x2, y2, 0, 0]);
    validateDistance([x1, y1, x2, y2]);
};