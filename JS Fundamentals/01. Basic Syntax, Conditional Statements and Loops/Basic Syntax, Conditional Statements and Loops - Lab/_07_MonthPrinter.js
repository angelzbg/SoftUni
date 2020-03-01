(month) => {
    let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    console.log(month > 0 && month < 13 ? months[month-1] : 'Error!');
}