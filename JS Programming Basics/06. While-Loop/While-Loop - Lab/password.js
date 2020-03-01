(input) => {
    const name = input.shift(), pwd = input.shift();
    let pwdIn = input.shift();
    while(pwdIn !== pwd) pwdIn = input.shift()
    console.log(`Welcome ${name}!`);
}