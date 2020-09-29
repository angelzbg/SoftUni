function loadRepos() {
  const username = document.getElementById('username').value || 'angelzbg';
  const repoUL = document.getElementById('repos');
  repoUL.innerHTML = '';
  fetch(`https://api.github.com/users/${username}/repos`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then((res) => {
      repoUL.innerHTML = res.map((repo) => `<li><a href="${repo.html_url}">${repo.full_name}</a></li>`).join('');
    })
    .catch((error) => (repoUL.innerHTML = error.message));
}
