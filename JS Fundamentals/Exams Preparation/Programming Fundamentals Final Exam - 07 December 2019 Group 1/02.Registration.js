registration = (input) => {
    let N = Number(input.shift()),
        successfulCount = 0;
    for(let i = 0; i < N; i++) {
        let registration = input.shift();
        let match = registration.match(/U\$(?<username>[A-Z][a-z]{2,})U\$P@\$(?<password>[A-Za-z]{5,}[0-9]+)P@\$/);
        if(match !== null) {
            console.log(`Registration was successful\nUsername: ${match.groups.username}, Password: ${match.groups.password}`);
            successfulCount++;
        } else {
            console.log('Invalid username or password');
        }
    }
    console.log(`Successful registrations: ${successfulCount}`);
}

registration([
    '3',
    'U$MichaelU$P@$asdqwe123P@$',
    'U$NameU$P@$PasswordP@$',
    'U$UserU$P@$ad2P@$'
  ]);