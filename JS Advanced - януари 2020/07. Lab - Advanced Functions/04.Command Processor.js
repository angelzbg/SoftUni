commandProcessor = (string = '') => ({
    append: (str = '') => (string += str),
    removeStart: (n = 0) => (string = string.substring(n)),
    removeEnd: (n = 0) => (string = string.substring(0, string.length - n)),
    print: () => console.log(string),
});
