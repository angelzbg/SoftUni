bookShelf = (input) => {
    let shelfs = {}, shelfsGenres = {};

    input.forEach(line => {
        if(line.includes('->')) { // create a shelf if the id if not taken.
            let [ id, genre ] = line.split(' -> ');
            if(!shelfs[id]) {
                shelfs[id] = genre;
                shelfsGenres[genre] = [];
            }
        } else { // if a shelf with that genre exists, add the book to the shelf
            let tokens = line.split(': ');
            let title = tokens.shift();
            let [ author, genre ] = tokens.shift().split(', ');
            if(shelfsGenres[genre]) {
                shelfsGenres[genre].push({ title, author });
            }
        }
    });

    Object.entries(shelfs)
    .sort((a, b) => shelfsGenres[b[1]].length - shelfsGenres[a[1]].length)
    .forEach(([shelfID, shelfGenre]) => {
        console.log(`${shelfID} ${shelfGenre}: ${shelfsGenres[shelfGenre].length}`);

        shelfsGenres[shelfGenre].sort((a, b) => a.title.localeCompare(b.title)).forEach(book => {
            console.log(`--> ${book.title}: ${book.author}`);
        });
    });
};