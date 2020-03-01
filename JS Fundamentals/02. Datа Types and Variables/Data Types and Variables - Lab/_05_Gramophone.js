(band, album, song) => {
    let songDuration = (album.length * band.length) * song.length/2;
    let times = Math.ceil(songDuration/2.5);
    console.log(`The plate was rotated ${times} times.`);
}