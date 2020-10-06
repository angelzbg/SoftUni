attachGradientEvents = (resultDiv = document.getElementById('result')) => {
  document
    .getElementById('gradient')
    .addEventListener(
      'mousemove',
      (e) => (resultDiv.textContent = `${Math.trunc((100 / e.target.clientWidth) * e.offsetX)}%`)
    );
  document.getElementById('gradient-box').addEventListener('mouseout', () => (resultDiv.textContent = ''));
};
