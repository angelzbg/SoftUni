((url = 'http://localhost:8000/messenger') => {
  const toJson = (res) => {
    return res.ok
      ? res.json()
      : (function () {
          throw new Error(res.statusText);
        })();
  };

  const elements = ['messages', 'author', 'content', 'submit', 'refresh'].map((id) => document.getElementById(id));
  const [textarea, nameIn, messageIn, submit, refresh] = elements;

  const render = (data) => {
    textarea.value = Object.values(data)
      .map(({ author, content }) => `${author}: ${content}`)
      .join('\n');
  };

  const loadData = () => {
    fetch(url)
      .then(toJson)
      .then(render)
      .catch((e) => console.error(e.message));
  };

  const sendMessage = (data) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
      body: JSON.stringify(data),
    })
      .then(() => {
        loadData();
        messageIn.value = '';
      })
      .catch((e) => console.error(e.message));
  };

  refresh.addEventListener('click', loadData);

  submit.addEventListener('click', () => {
    const [author, content] = [nameIn, messageIn].map((el) => el.value.trim());
    if (author && content) {
      sendMessage({ author, content });
    }
  });

  loadData();
})();
