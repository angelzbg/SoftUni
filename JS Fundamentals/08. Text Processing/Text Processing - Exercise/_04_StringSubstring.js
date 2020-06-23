stringSubstring = (substring = '', string = '') => {
    console.log(string.toLowerCase().split(' ').filter(w => w === substring.toLowerCase()).length ? substring : `${substring} not found!`);
};