replaceRepeating = (string = '') => {
    let replaced = '';
    for(let i = 0; i < string.length; i++) {
        if(string[i] !== string[i + 1]) {
            replaced += string[i];
        }
    }
    
    console.log(replaced);
};