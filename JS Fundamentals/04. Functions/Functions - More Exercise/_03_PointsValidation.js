([ x1, y1, x2, y2 ]) => {
    let validateDistance = (x1, y1, x2, y2) => {
        let distance = Math.sqrt(Math.pow(x2-x1, 2) + Math.pow(y2-y1, 2));
        console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${Number.isInteger(distance) ? 'valid' : 'invalid'}`);
    };

    validateDistance(x1, y1, 0, 0);
    validateDistance(x2, y2, 0, 0);
    validateDistance(x1, y1, x2, y2);
}