deleteByEmail = () => {
    const emailToDelete = document.getElementsByTagName('input')[0].value;
    const found = [].slice.call(document.querySelectorAll('td')).filter((a) => a.textContent.match(emailToDelete))[0];
    if (found) {
        found.parentNode.parentNode.removeChild(found.parentNode);
        document.getElementById('result').textContent = 'Deleted.';
    } else {
        document.getElementById('result').textContent = 'Not found.';
    }
};
