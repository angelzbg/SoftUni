matchFullName = (names) => {
    console.log(names.shift().match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g).join(' '));
}