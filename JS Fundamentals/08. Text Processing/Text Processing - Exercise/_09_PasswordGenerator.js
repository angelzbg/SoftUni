passwordGenerator = ([str1, str2, word]) => {
    word = word;
    let specialIndex = -1;
    let password = (str1 + str2).split('');
    for(let i=0; i<password.length; i++) {
        if('aeiou'.includes(password[i])) {
            if(specialIndex === word.length-1) specialIndex = 0;
            else specialIndex++;
            password[i] = word.charAt(specialIndex).toUpperCase();
        }
    }
    console.log('Your generated password is ' + password.reverse().join(''));
}