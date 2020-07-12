solve = () => {
    const expressionOutput = document.getElementById('expressionOutput');
    const resultOutput = document.getElementById('resultOutput');

    const handleButtonClick = (e) => {
        const target = e.target;

        if (target.className === 'clear') {
            [expressionOutput.textContent, resultOutput.textContent] = ['', ''];
        } else if (target.value === '=') {
            let result = NaN;
            try {
                result = Number(eval(expressionOutput.textContent));
            } catch {
                result = NaN;
            } finally {
                resultOutput.textContent = result;
            }
        } else if (target.value.match(/[\/*\-\+]/g)) {
            expressionOutput.textContent = expressionOutput.textContent + ` ${target.value} `;
        } else {
            expressionOutput.textContent = expressionOutput.textContent + target.value;
        }
    };

    for (el of document.getElementsByTagName('button')) {
        el.addEventListener('click', handleButtonClick);
    }
};
