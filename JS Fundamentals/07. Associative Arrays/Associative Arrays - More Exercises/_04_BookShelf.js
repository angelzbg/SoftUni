bookShelf = (input) => {
    let shelfs = {}, shelfsGenres = {};

    input.forEach(line => {
        if(line.includes('->')) { // create a shelf if the id is not taken.
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
}

bookShelf(['1 -> history', '1 -> action', 'Death in Time: Criss Bell, mystery', '2 -> mystery', '3 -> sci-fi', 'Child of Silver: Bruce Rich, mystery', 'Hurting Secrets: Dustin Bolt, action', 'Future of Dawn: Aiden Rose, sci-fi', 'Lions and Rats: Gabe Roads, history', '2 -> romance', 'Effect of the Void: Shay B, romance', 'Losing Dreams: Gail Starr, sci-fi', 'Name of Earth: Jo Bell, sci-fi', 'Pilots of Stone: Brook Jay, history']);