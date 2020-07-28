pascalCaseSplitter = (string = '') => string.match(/[A-Z]([a-z]+)?/g).join(', ');
