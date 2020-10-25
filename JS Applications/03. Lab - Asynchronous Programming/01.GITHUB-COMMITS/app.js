function loadCommits() {
  const [usernameIn, repositoryIn, ul] = [...document.querySelectorAll('input, ul')];
  const [username, repository] = [usernameIn, repositoryIn].map((el) => el.value.trim());
  fetch(`https://api.github.com/repos/${username}/${repository}/commits`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then((res) => (ul.innerHTML = res.map((e) => `<li>${e.commit.author.name}: ${e.commit.message}</li>`).join('')))
    .catch((error) => (ul.innerHTML = `<li>Error: ${error.message}</li>`));
}
