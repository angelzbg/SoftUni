attachGradientEvents = () => {
    const resultDiv = document.getElementById('result');
    document.getElementById('gradient').addEventListener('mousemove', (e) => {
        const mouseX = e.offsetX;
        const width = e.target.clientWidth;
        const percent = (100 / width) * mouseX;
        resultDiv.textContent = `${Math.trunc(percent)}%`;
    });
    document.getElementById('gradient-box').addEventListener('mouseout', () => {
        resultDiv.textContent = '';
    });
};
