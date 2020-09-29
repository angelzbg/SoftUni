function loadRepos() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      document.getElementById('res').textContent = xhr.status === 200 ? xhr.responseText : xhr.statusText;
    }
  };
  xhr.open('GET', 'https://api.github.com/users/testnakov/repos');
  xhr.send();
}
