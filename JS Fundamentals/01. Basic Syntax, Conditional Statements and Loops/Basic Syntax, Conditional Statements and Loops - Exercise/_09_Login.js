(input) => {
    let user = input.shift(), password = user.split('').reverse().join('');
    let line = input.shift();
    let counter = 0;
    while(line !== password) {
        counter++;
        if(counter == 4) {
            console.log(`User ${user} blocked!`);
            break;
        } else {
            console.log('Incorrect password. Try again.');
        }
        line = input.shift();
    }
    if(counter < 4) console.log(`User ${user} logged in.`);
}