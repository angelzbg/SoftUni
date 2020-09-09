timeToWalk = (steps = 1, footprintLengthM = 1, speedKMH = 1) => {
    const distance = steps * footprintLengthM;
    const speedMSec = (speedKMH * 1000) / 60 / 60;
    const restsInSecs = parseInt(distance / 500) * 60;
    const timeSecs = Math.round(distance / speedMSec + restsInSecs);

    const date = new Date(null, null, null, null, null, timeSecs);
    const timeFormat = date.toLocaleTimeString([], { hour12: false });

    console.log(timeFormat);
};

/*
// if more than 24 hours use this
let timeSecs = distance / speedMSec + restsInSecs;
let sec = Math.round(timeSecs % 60);
let min = Math.floor(timeSecs / 60 % 60);
let hr = Math.floor(timeSecs / 3600);
//let hr = Math.floor(timeSecs / 3600 % 24);

hr = hr < 10 ? '0' + hr : hr;
min = min < 10 ? '0' + min : min;
sec = sec < 10 ? '0' + sec : sec;

console.log(hr + ':' + min + ":" + sec);
//*/
