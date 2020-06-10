division = (num) => {
	let div = [ 10, 7, 6, 3, 2 ];
    let output = 'Not divisible', leftPart = 'The number is divisible by ';
	for(let i = 0; i < 5; i++) {
		if(num % div[i] === 0) {
            return console.log(leftPart + div[i]);
        }
    }
    console.log(output);
};