matchFullName = (names) => {
    console.log(names.shift().match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g).join(' '));
}

matchFullName([
    'Ivan Ivanov, Ivan ivanov, ivan Ivanov, IVan Ivanov, Test Testov, Ivan\tIvanov'
  ]);