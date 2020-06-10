distinctArray = (arr) => {
    let unique = [...new Set(arr)];
    console.log(unique.length === arr.length ? 'No repeating elements' : unique.join(' '));
};