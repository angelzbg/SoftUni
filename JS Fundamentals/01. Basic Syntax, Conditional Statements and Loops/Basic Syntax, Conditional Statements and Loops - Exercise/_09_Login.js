login = (input = []) => {
    let [user, password, counter] = [input.shift(), (password = user.split('').reverse().join('')), 0];
    while ((line = input.shift()) !== password) {
        if (++counter === 4) {
            return console.log(`User ${user} blocked!`);
        } else {
            console.log('Incorrect password. Try again.');
        }
    }

    console.log(`User ${user} logged in.`);
};
