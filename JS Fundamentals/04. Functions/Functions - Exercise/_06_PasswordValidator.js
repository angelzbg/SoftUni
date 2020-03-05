(password) => {
    let checkLength = (pwd) => {
        if(pwd.length < 6 || pwd.length > 10) {
            console.log('Password must be between 6 and 10 characters');
            return false;
        }
        return true;
    };
    let checkSymbols = (pwd) => {
        if(!pwd.match(/^[A-Za-z0-9]+$/)) {
            console.log('Password must consist only of letters and digits');
            return false;
        }
        return true;
    };
    let checkDigits = (pwd) => {
        let digits = 0;
        for(let i=0; i<pwd.length; i++) {
            if(!isNaN(pwd[i])) digits++;
        }
        if(digits < 2) {
            console.log('Password must have at least 2 digits');
            return false;
        }
        return true;
    };

    if(checkLength(password) & checkSymbols(password) & checkDigits(password)) console.log('Password is valid');
}