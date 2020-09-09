solve = () => {
    const answers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];
    let [correct, index] = [0, 0];

    Array.from(document.querySelectorAll('.answer-text')).map((x) =>
        x.addEventListener('click', function nextSection(e) {
            if (answers[index] === e.target.textContent) {
                correct++;
            }

            document.querySelectorAll('section')[index++].style.display = 'none';

            if (document.querySelectorAll('section')[index]) {
                let nextSection = document.querySelectorAll('section')[index];
                nextSection.style.display = 'block';
            } else {
                document.querySelector('#results').style.display = 'block';
                document.querySelector('#results h1').textContent =
                    correct === answers.length
                        ? 'You are recognized as top JavaScript fan!'
                        : `You have ${correct} right answers`;
            }
        }),
    );
};
