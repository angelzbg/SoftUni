class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.validateClientId(clientId);
        this.validateEmail(email);
        this.validateName(firstName, true);
        this.validateName(lastName, false);
    }

    validateClientId = (clientId) => {
        if (isNaN(clientId) || !/^\d{6}$/.test(clientId)) {
            throw new TypeError('Client ID must be a 6-digit number');
        }
    };

    validateEmail = (email) => {
        if (!/^[a-zA-Z0-9]+@[a-zA-Z]+(\.[a-zA-Z]+)+$/.test(email)) {
            throw new TypeError('Invalid e-mail');
        }
    };

    validateName = (name, isFirstName) => {
        const type = {
            true: 'First',
            false: 'Last',
        };

        if (name.length < 3 || name.length > 20) {
            throw new TypeError(`${type[isFirstName]} name must be between 3 and 20 characters long`);
        }

        if (!/^[a-zA-Z]+$/.test(name)) {
            throw new TypeError(`${type[isFirstName]} name must contain only Latin characters`);
        }
    };
}

let acc = new CheckingAccount('423415', 'petkan@another.co.uk', 'Petkan', 'Draganov');
