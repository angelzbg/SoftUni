(country) => {
    let table = {
        'England': 'English',
        'USA': 'English',
        'Spain': 'Spanish',
        'Argentina': 'Spanish',
        'Mexico': 'Spanish'
    };
    console.log(table[country] !== undefined ? table[country] : 'unknown');
}