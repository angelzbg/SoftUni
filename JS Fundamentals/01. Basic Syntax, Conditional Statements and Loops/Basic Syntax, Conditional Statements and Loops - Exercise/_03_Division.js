division = (num = 1) => {
	const div = [ 10, 7, 6, 3, 2 ];
    let [output, leftPart] = ['Not divisible', 'The number is divisible by '];
	for(let i = 0; i < div.length; i++) {
		if(num % div[i] === 0) {
            return console.log(leftPart + div[i]);
        }
    }
    
    console.log(output);
};