(input) => {
    let movies = [];
    for(let i=0; i<input.length; i++) {
        let args = input[i].split(' ');
        if(args[0] === 'addMovie') {
            movies.push({ name: args.slice(1).join(' ') });
        } else {
            let indexBy = args.indexOf('directedBy'),
                indexOn = args.indexOf('onDate');
            if(indexBy !== -1) {
                let name = args.slice(0, indexBy).join(' ');
                let movie = movies.find(m => m.name === name);
                if(movie !== undefined) {
                    movie.director = args.slice(indexBy+1).join(' ');
                }
            } else if(indexOn !== -1) {
                let name = args.slice(0, indexOn).join(' ');
                let movie = movies.find(m => m.name === name);
                if(movie !== undefined) {
                    movie.date = args.pop();
                }
            }
        }
    }

    movies.forEach(m => {
        if(m.director && m.date) {
            console.log(JSON.stringify(m));
        }
    });
}