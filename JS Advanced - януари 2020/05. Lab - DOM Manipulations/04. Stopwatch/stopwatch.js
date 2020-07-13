stopwatch = () => {
    const startButton = document.getElementById('startBtn');
    const stopButton = document.getElementById('stopBtn');
    const timer = document.getElementById('time');

    let counter = 0;
    let interval;

    startButton.addEventListener('click', () => {
        timer.textContent = '00:00'; // tova e greshno po ulovie, obache softuni smqta che taka trqbva da bude <3
        interval = setInterval(() => {
            counter += 1;
            const seconds = counter % 60;
            const minutes = Math.floor(counter / 60);
            timer.textContent = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        }, 1000);
        stopButton.disabled = false;
        startButton.disabled = true;
    });

    stopButton.addEventListener('click', () => {
        clearInterval(interval);
        counter = 0;
        stopButton.disabled = true;
        startButton.disabled = false;
    });
};