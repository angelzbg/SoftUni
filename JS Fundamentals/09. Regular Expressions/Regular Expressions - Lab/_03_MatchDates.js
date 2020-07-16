matchDates = ([dates = '']) => {
    let pattern = /\b(?<day>\d{2})([-\.\/])(?<month>[A-Z][a-z]{2})\2(?<year>\d{4})\b/g;
    while ((date = pattern.exec(dates))) {
        let groups = date.groups;
        console.log(`Day: ${groups.day}, Month: ${groups.month}, Year: ${groups.year}`);
    }
};
