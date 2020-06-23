bombNumber = (nums = [], [ special = 1, power = 1 ]) => {
    let indexSpecial = nums.indexOf(special);
    while(indexSpecial !== -1) {
        //nums.splice(indexSpecial-power, power*2+1);
        for(let i = indexSpecial - power; i <= indexSpecial + power; i++) {
            nums[i] = 0;
        }
        
        indexSpecial = nums.indexOf(special, indexSpecial + power + 1);
    }

    console.log(nums.reduce( (a, b) => a + b, 0 ));
};