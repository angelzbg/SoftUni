nextDay = (y, m, d) => {
    let date = new Date(y, m-1, d);
    let newDate = new Date(date.getTime() + 1000*60*60*24);
    console.log(`${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`);
}