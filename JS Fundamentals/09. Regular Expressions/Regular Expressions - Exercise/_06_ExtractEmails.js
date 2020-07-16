extractEmails = ([input = '']) => {
    let pattern = /(?<=\s)[a-z0-9]+([\._-]?[a-z0-9]+)?@[a-z]+\-?[a-z]+(\.[a-z]+\-?[a-z])+/g;
    while ((result = pattern.exec(input))) {
        console.log(result[0]);
    }
};
