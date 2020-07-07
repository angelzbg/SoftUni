songs = (input = []) => {
    function Song(songStr) {
        [this.type, this.name, this.time] = songStr.split('_');
    }

    input.shift();
    const type = input.pop();

    return input
        .reduce((songs, songStr) => {
            const currentSong = new Song(songStr);
            if (type === 'all' || type === currentSong.type) {
                songs.push(currentSong);
            }

            return songs;
        }, [])
        .map((song) => song.name)
        .join('\n');
};
