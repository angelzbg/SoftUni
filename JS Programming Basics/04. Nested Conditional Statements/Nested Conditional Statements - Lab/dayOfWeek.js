(input) => {
    const days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Error' ];
    const day = Number(input.shift());
    console.log(day > 0 && day < 8 ? days[day-1] : 'Error');
}