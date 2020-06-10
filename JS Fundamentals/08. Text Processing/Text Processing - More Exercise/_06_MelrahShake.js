melrahShake = ([string, pattern]) => {
    while(string.length > 0 && pattern.length > 0) {
        let firstIndex = string.indexOf(pattern);
        let lastIndex = string.lastIndexOf(pattern);

        if (firstIndex >= 0 && lastIndex >= 0 && firstIndex !== lastIndex) {
            console.log("Shaked it.");

            string = string.split('');
            string.splice(firstIndex, pattern.length);
            string = string.join('');

            lastIndex = string.lastIndexOf(pattern);

            string = string.split('');
            string.splice(lastIndex, pattern.length);
            string = string.join('');

            pattern = pattern.split('');
            pattern.splice(Math.floor(pattern.length / 2), 1);
            pattern = pattern.join('');
        } else {
            break;
        }
    }
    console.log(`No shake.\n${string}`);
};