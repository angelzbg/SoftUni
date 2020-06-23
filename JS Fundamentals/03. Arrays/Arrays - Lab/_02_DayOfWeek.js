dayOfWeek = (day = 1) => {
    let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    console.log(days[day - 1] || 'Invalid day!');
};