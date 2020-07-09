phoneBook = (input = []) => {
    return Object.entries(
        input
            .map((contactsString) => contactsString.split(' '))
            .reduce((contacts, [name, phone]) => Object.assign(contacts, { [name]: phone }), {}),
    )
        .map(([name, number]) => `${name} -> ${number}`)
        .join('\n');
};
