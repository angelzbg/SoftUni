stringSubstring = (substring, string) => {
    console.log(string.toLowerCase().split(' ').filter(w => w === substring.toLowerCase()).length > 0 ? substring : `${substring} not found!`);
}