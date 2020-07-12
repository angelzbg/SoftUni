subtract = () => {
    const byId = (id) => document.getElementById(id);
    const [a, b] = [Number(byId('firstNumber').value), Number(byId('secondNumber').value)];
    byId('result').innerHTML = Number((a - b).toFixed(2));
};
