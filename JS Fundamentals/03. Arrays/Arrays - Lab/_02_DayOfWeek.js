dayOfWeek = (day) => {
    let days = [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ];
    console.log(day > 0 && day <= days.length ? days[day-1] : 'Invalid day!');
}