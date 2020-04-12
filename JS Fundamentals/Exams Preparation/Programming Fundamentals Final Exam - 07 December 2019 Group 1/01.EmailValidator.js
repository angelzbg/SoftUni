emailValidator = (input) => {
    let email = input.shift();
    while((cmd = input.shift().split(' '))[0] !== 'Complete') {
        if(cmd[0] === 'Make') {
            if(cmd[1] === 'Upper') {
                email = email.toUpperCase();
            } else { // 'Lower'
                email = email.toLowerCase();
            }
            console.log(email);
        } else if(cmd[0] === 'GetDomain') {
            console.log(email.substring(email.length - Number(cmd[1])));
        } else if(cmd[0] === 'GetUsername') {
            let index = email.indexOf('@');
            if(index < 0) {
                console.log(`The email ${email} doesn't contain the @ symbol.`);
            } else {
                console.log(email.substring(0, index));
            }
        } else if(cmd[0] === 'Replace') {
            email = email.replace(new RegExp(cmd[1], 'g'), '-');
            console.log(email);
        } else { // 'Encrypt'
            console.log(email.split('').map(ch => ch.charCodeAt(0)).join(' '));
        }
    }
}

emailValidator([
    'Mike123@somemail.com',
    'Make Upper',
    'GetDomain 3',
    'GetUsername',
    'Encrypt',
    'Complete'
  ]);