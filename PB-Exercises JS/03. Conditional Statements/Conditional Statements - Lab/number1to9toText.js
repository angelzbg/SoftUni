(input) => {
    const num = Number(input.shift());
    const nums = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];
    console.log(num < 1 || num > 9 ? 'number too big' : nums[num-1])
}