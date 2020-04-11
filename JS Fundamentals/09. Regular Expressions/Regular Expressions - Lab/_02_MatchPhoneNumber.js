matchPhoneNumber = ([phones]) => {
    console.log(phones.match(/\+359([ -])2\1\d{3}\1\d{4}\b/g).join(', '));
}