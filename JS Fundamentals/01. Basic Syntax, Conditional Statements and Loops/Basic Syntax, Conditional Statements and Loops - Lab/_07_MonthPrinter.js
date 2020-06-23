monthPrinter = (month = 1) => {
    let months = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];
    console.log(months[month -1 ] || 'Error!');
};