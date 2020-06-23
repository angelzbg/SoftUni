sortNumbers = (...numbers) => {
    console.log(numbers.sort((a,b) => b - a).join('\n'));
};