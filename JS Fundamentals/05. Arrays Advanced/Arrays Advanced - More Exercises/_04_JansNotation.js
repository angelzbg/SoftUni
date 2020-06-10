jansNotation = (input) => {
    let nums = [];
    while(input.length > 0) {
        let whatever = input.shift();

        if(isNaN(whatever)) {
            if(nums.length < 2) {
                return console.log('Error: not enough operands!');
            } else {
                let num2 = nums.pop(), num1 = nums.pop();
                let result = 0;

                if(whatever === '+') {
                    result = num1 + num2;
                } else if(whatever === '-') {
                    result = num1 - num2;
                } else if(whatever === '*') {
                    result = num1 * num2;
                } else {
                    result = num1 / num2;
                }
                
                nums.push(result);
            }
        } else {
            nums.push(whatever);
        }
    }

    console.log(nums.length > 1 ? 'Error: too many operands!' : nums.shift());
};