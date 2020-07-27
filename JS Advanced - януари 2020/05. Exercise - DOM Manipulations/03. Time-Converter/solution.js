attachEventsListeners = () => {
    const days = document.getElementById('days');
    const hours = document.getElementById('hours');
    const minutes = document.getElementById('minutes');
    const seconds = document.getElementById('seconds');

    const setConvertedValues = (sec = 0) => {
        [days.value, hours.value, minutes.value, seconds.value] = [sec / 86400, sec / 3600, sec / 60, sec];
    };

    const daysBtn = document.getElementById('daysBtn');
    const hoursBtn = document.getElementById('hoursBtn');
    const minutesBtn = document.getElementById('minutesBtn');
    const secondsBtn = document.getElementById('secondsBtn');

    daysBtn.onclick = () => setConvertedValues(+days.value * 86400);
    hoursBtn.onclick = () => setConvertedValues(+hours.value * 3600);
    minutesBtn.onclick = () => setConvertedValues(+minutes.value * 60);
    secondsBtn.onclick = () => setConvertedValues(+seconds.value);
};
