passwordValidator = (password = '') => {
    const checkLength = (pwd = '') => {
        if (pwd.length < 6 || pwd.length > 10) {
            console.log('Password must be between 6 and 10 characters');
            return false;
        }

        return true;
    };

    const checkSymbols = (pwd = '') => {
        if (!pwd.match(/^[A-Za-z0-9]+$/)) {
            console.log('Password must consist only of letters and digits');
            return false;
        }

        return true;
    };

    const checkDigits = (pwd = '') => {
        if (!(digits = pwd.match(/[0-9]/g)) || digits.length < 2) {
            console.log('Password must have at least 2 digits');
            return false;
        }

        return true;
    };

    if (checkLength(password) & checkSymbols(password) & checkDigits(password)) {
        console.log('Password is valid');
    }
};
