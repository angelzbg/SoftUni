solve = () => {
    const N = 3;
    const [btnCheck, btnClear] = document.querySelectorAll('button');
    const table = document.querySelectorAll('table')[0];
    const inputs = [...table.querySelectorAll('tbody > tr > td > input')];
    const paragraph = document.querySelectorAll('#check > p')[0];

    btnCheck.addEventListener('click', () => {
        const { rows, cols } = inputs
            .map((input) => input.value)
            .reduce(
                ({ rows, cols }, number, index) => {
                    cols[index % N].push(number);
                    rows[Math.floor(index / N)].push(number);
                    return { rows, cols };
                },
                {
                    rows: new Array(N).fill().map((x) => new Array()),
                    cols: new Array(N).fill().map((x) => new Array()),
                },
            );

        let isSolved = true;

        for (let i = 0; i < N; i++) {
            if (new Set(rows[i]).size !== N || new Set(cols[i]).size !== N) {
                isSolved = false;
                break;
            }
        }

        table.style.border = isSolved ? '2px solid green' : '2px solid red';
        paragraph.style.color = isSolved ? 'green' : 'red';
        paragraph.textContent = isSolved ? 'You solve it! Congratulations!' : 'NOP! You are not done yet...';
    });

    btnClear.addEventListener('click', () => {
        inputs.forEach((input) => (input.value = ''));
        table.style.border = 'none';
        paragraph.textContent = '';
    });
};
