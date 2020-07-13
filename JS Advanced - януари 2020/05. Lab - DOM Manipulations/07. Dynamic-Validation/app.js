validate = () => {
    const regex = /^[a-z]+@[a-z]+\.[a-z]+$/;
    const input = document.getElementById('email');
    input.addEventListener('change', (e) => {
        e.target.className = !regex.test(e.target.value) ? 'error' : '';
    });
};
