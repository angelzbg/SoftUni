wrongResult = (...nums) => {
    console.log(nums.reduce((a, b) => a * b) < 0 ? 'Negative' : 'Positive');
};
