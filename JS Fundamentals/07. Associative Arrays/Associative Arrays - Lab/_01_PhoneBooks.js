phoneBook = (input) => {
    let phoneBook = {};
    input.forEach(el => {
        let [ name, phone ] = el.split(' ');
        phoneBook[name] = phone;
    });

    Object.entries(phoneBook).forEach(([key, value]) => console.log(`${key} -> ${value}`));
}