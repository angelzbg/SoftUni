songs = (input) => {
    class Song {
        constructor(typeList, name, time) {
            this.typeList = typeList;
            this.name = name;
            this.time = time;
        }
    }

    let typeFilter = input.pop(),
        count = input.shift(),
        songs = [];

    for(let i=0; i<count; i++) {
        let [ typeList, name, time ] = input[i].split('_');
        if(typeFilter === 'all' || typeFilter === typeList) {
            songs.push(new Song(typeList, name, time));
        }
    }

    songs.forEach(song => {
        console.log(song.name);
    });

};