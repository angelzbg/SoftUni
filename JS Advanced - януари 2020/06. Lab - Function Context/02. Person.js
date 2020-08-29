function Person(firstName, lastName) {
    return Object.defineProperties(
        {},
        {
            firstName: {
                get() {
                    return firstName;
                },
                set(name = '') {
                    firstName = name;
                },
            },
            lastName: {
                get() {
                    return lastName;
                },
                set(name = '') {
                    lastName = name;
                },
            },
            fullName: {
                get() {
                    return `${firstName} ${lastName}`;
                },
                set(name = '') {
                    (name = name.split(' ')).length === 2 ? ([firstName, lastName] = name) : null;
                },
            },
        },
    );
}
